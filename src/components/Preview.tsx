import { FC, useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
<html>
  <head>
  </head>
  <body>
    <div id='root'></div>
    <script>
      const handleError = (err) => {
        const root = document.querySelector('#root')
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
            console.error(err);
      }

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      })

      window.addEventListener('message', (event)=>{
        try{
          eval(event.data);
        } catch (err) {
          handleError(err)
        } 
      }, false);
    </script>
  </body>
</html>
`;

const Preview: FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // reset content inside our iframe before each every submit to prevent user
    // accidentally delete the root element
    iframe.current.srcdoc = html;

    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="iframe-wrapper">
      <iframe
        ref={iframe}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
        className="w-[100%] h-[100%] bg-white"
      />
      {err && (
        <div className="absolute top-[10px] left-[10px] text-red-500 font-medium">
          {err}
        </div>
      )}
    </div>
  );
};

export default Preview;
