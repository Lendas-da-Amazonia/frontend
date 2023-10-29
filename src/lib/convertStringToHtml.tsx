export const convertStringToHTML = (htmlString: string) => {
  return (
    <div
      key="content"
      className="text-justify"
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  )
}
