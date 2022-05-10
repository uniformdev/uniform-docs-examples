import { Slot } from '@uniformdev/canvas-react';

export function SampleSublayout() {
  return (
    <div id="CenterColumn">
      <Slot name="centercolumn"></Slot>
    </div>
  );
}