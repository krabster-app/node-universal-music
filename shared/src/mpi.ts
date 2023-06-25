import { Worker, MessagePort } from 'worker_threads'

export const enum MessagePassingInterfaceErrorKind {
  TimeoutExceeded = 'TimeoutExceeded',
}

export type MessagePassingInterfaceErrorType = {
  type: MessagePassingInterfaceErrorKind.TimeoutExceeded
}

export class MessagePassingInterfaceError extends Error {
  name = 'MessagePassingInterfaceError'

  constructor(public readonly cause: MessagePassingInterfaceErrorType) {
    super()
  }
}

export type UnsubscribeFn = () => void
export type WhenOptions<O> = {
  timeoutMs?: number
  filter?: MessageFilterFn<O>
}
export type MessageListener<O> = (msg: O) => void
export type MessageFilterFn<O> = (msg: O) => boolean
export interface IMessagePassingInterface<I, O> extends AsyncIterable<O> {
  send(msg: I): void
  listen(listener: MessageListener<O>): UnsubscribeFn
  when(options?: WhenOptions<O>): Promise<O>
  whenIter(options?: WhenOptions<O>): AsyncIterator<O>
}

export class MessagePassingInterface<I, O>
  implements IMessagePassingInterface<I, O>
{
  readonly #client: Worker | MessagePort
  readonly #listeners = new Set<MessageListener<O>>()

  constructor(client: Worker | MessagePort) {
    this.#client = client

    this.#client.on('message', (msg: O) =>
      this.#listeners.forEach(listener => listener(msg)),
    )
  }

  send(msg: I) {
    console.log('[MPI] Sending message', msg)
    this.#client.postMessage(msg)
  }

  listen(listener: MessageListener<O>): UnsubscribeFn {
    this.#listeners.add(listener)
    return () => this.#listeners.delete(listener)
  }

  when(options: WhenOptions<O> = {}): Promise<O> {
    const filter = options.filter ?? (() => true)
    const timeoutMs = options.timeoutMs ?? 5_000

    return new Promise((res, rej) => {
      const unsubscribe = this.listen(msg => {
        if (filter(msg)) {
          unsubscribe()
          res(msg)
        }
      })

      setTimeout(() => {
        unsubscribe()
        rej(
          new MessagePassingInterfaceError({
            type: MessagePassingInterfaceErrorKind.TimeoutExceeded,
          }),
        )
      }, timeoutMs)
    })
  }

  async *whenIter(options?: WhenOptions<O>): AsyncIterator<O> {
    // TODO: implement graceful close
    while (true) {
      yield await this.when(options)
    }
  }

  async *[Symbol.asyncIterator](): AsyncIterator<O> {
    while (true) {
      yield await this.when()
    }
  }
}
