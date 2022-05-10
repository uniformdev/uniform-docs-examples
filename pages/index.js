import {
  CanvasClient,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  enhance,
  EnhancerBuilder,
} from "@uniformdev/canvas";
import { Composition, Slot } from "@uniformdev/canvas-react";
import { getPageInfo, createItemEnhancer } from "@uniformdev/canvas-sitecore";
import { parseUniformServerConfig } from "@uniformdev/common-server";
import { noopLogger } from "@uniformdev/common-client";
import { resolveRenderer } from "../lib/resolveRenderer";
import { useLivePreviewNextStaticProps } from "../lib/useLivePreviewNextStaticProps";

async function getComposition(slug, state) {
  const client = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });
  const { composition } = await client.getCompositionBySlug({
    slug,
    state,
  });
  return composition;
}

export async function getStaticProps({ preview }) {
  const slug = "/";
  const state = preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE;
  const composition = await getComposition(slug, state);
  const config = parseUniformServerConfig(process.env, noopLogger, true);
  const { pageId, pageData } = await getPageInfo({
    composition,
    config,
    isPreview: preview,
  });
  const itemEnhancer = createItemEnhancer({
    pageId,
    pageItem: pageData,
    config,
    isPreview: preview,
    throwOnNotFound: true,
  });

  const enhancers = new EnhancerBuilder().component(
    [
      "sampleMvcLayout",
      "sampleMvcSublayout",
      "sampleMvcInnerSublayout",
      "sampleMvcRendering",
    ],
    (builder) => builder.data("model", itemEnhancer)
  );
  await enhance({ composition, enhancers });
  return {
    props: { composition },
  };
}

export default function Home({ composition }) {
  useLivePreviewNextStaticProps({
    compositionId: composition?._id,
    projectId: process.env.NEXT_PUBLIC_UNIFORM_PROJECT_ID,
  });
  return (
    <Composition data={composition} resolveRenderer={resolveRenderer}>
      <Slot name="layout" />
    </Composition>
  );
}
