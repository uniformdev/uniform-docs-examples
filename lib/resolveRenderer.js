import { SampleLayout } from '../components/SampleLayout';
import { SampleSublayout } from '../components/SampleSublayout';
import { SampleInnerSublayout } from '../components/SampleInnerSublayout';
import { SampleRendering } from '../components/SampleRendering';
import { DefaultNotImplementedComponent } from '@uniformdev/canvas-react';

const mapping = {};
mapping['sampleMvcLayout'] = SampleLayout;
mapping['sampleMvcSublayout'] = SampleSublayout;
mapping['sampleMvcInnerSublayout'] = SampleInnerSublayout;
mapping['sampleMvcRendering'] = SampleRendering;

export const resolveRenderer = (component) => {
  if (component?.type) {
    const implementation = mapping[component.type]
    if (implementation) return implementation;
  }
  return DefaultNotImplementedComponent
};