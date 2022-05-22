const username = "User-" + Math.round(Math.random() * 10000);

async function exampleLoaded() {
  const content = document.getElementById("source-editor");
  content.style.visibility = "visible";
}

define("monaco-example", [
  "vs/editor/editor.main",
  "Convergence",
  "MonacoConvergenceAdapter",
], function (_, Convergence, MonacoConvergenceAdapter) {
  //
  // Create the target editor where events will be played into.
  //
  const editor = monaco.editor.create(
    document.getElementById("source-editor"),
    {
      value: editorContents,
      theme: "vs-dark'",
      language: "javascript",
    }
  );

  Convergence.connectAnonymously(CONVERGENCE_URL, username)
    .then((d) => {
      domain = d;
      // Now open the model, creating it using the initial data if it does not exist.
      return domain.models().openAutoCreate({
        collection: "default",
        id: convergenceExampleId,
        data: {
          text: editorContents,
        },
        ephemeral: false,
      });
    })
    .then((model) => {
      const adapter = new MonacoConvergenceAdapter(
        editor,
        model.elementAt("text")
      );
      adapter.bind();
      exampleLoaded();
    })
    .catch((error) => {
      console.error("Could not open model ", error);
    });
});
