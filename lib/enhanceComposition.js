import { EnhancerBuilder, enhance } from "@uniformdev/canvas";
import { createItemEnhancer } from '@uniformdev/canvas-sitecore';

export async function enhanceComposition({ composition, config, pageId, pageData, context, isPreview }) {
  const itemEnhancer = createItemEnhancer({
    pageId,
    pageItem: pageData,
    config,
    isPreview,
  });

  const enhancers = new EnhancerBuilder()
    .component('sampleRendering', b => b.data('model', itemEnhancer))

  await enhance({ composition, enhancers, context });
}