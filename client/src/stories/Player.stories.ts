import type { Meta, StoryObj } from '@storybook/react'
import { PlayerFullscreen } from '@sovok/client/components/player/PlayerFullscreen'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Component/PlayerFS',
  component: PlayerFullscreen,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof PlayerFullscreen>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {},
}
