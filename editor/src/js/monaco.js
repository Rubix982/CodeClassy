define("monaco-example", [
  "vs/editor/editor.main",
  "Convergence",
  "MonacoConvergenceAdapter",
  "Config",
  "Contents",
], function (_, Convergence, MonacoConvergenceAdapter) {
  const username = "User-" + Math.round(Math.random() * 10000);
  const language = {
    c: cLanguageDefaultContents,
    cpp: cppLanguageDefaultContents,
    java: javaLanguageDefaultContents,
    python: pythonLanguageDefaultContents,
  };
  const defaultLanguage = "c";

  Convergence.connectAnonymously(CONVERGENCE_URL, username)
    .then(async (domain) => {
      return await domain.models().openAutoCreate({
        collection: "default",
        id: URL(location.href).pathname.split("/")[2],
        data: {
          text: language[defaultLanguage],
        },
        ephemeral: false,
      });
    })
    .then((model) => {
      const editor = monaco.editor.create(
        document.getElementById("source-editor"),
        {
          value: model.root().value().text,
          theme: "vs-dark",
          language: "cpp",
        }
      );

      const adapter = new MonacoConvergenceAdapter(
        editor,
        model.elementAt("text")
      );
      adapter.bind();
      () => {
        const content = document.getElementById("source-editor");
        content.style.visibility = "visible";
      };
    })
    .catch((error) => {
      console.error(`Could not open model ${error}`);
    });
});
