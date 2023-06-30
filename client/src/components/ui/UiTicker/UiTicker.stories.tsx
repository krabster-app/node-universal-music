import type { Meta, StoryObj } from '@storybook/react'
import { UiTicker } from './UiTicker'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Ui/Ticker',
  component: UiTicker,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'input' },
  },
} satisfies Meta<typeof UiTicker>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    text: 'SeanPaulWasNeverThereToGimmeTheLight',
  },
}
