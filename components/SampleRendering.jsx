export function SampleRendering({ model }) {
    return (
      <div>
        <h1 className="contentTitle">{model.Title}</h1>
  
        {/* rich text field needs to be rendered via dangerouslySetInnerHTML */}
        <div className="contentDescription" dangerouslySetInnerHTML={{ __html: model.Text }}></div>
      </div>
    );
  }