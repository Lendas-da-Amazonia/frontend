import { Link } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

const convertStringToHTML = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Certifique-se de adicionar uma chave única aqui se renderizar vários elementos.
  return (
    <div
      key="content"
      className="text-justify"
      dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }}
    />
  );
};

const content = `
  <p>
    Há muito tempo, <b>nas profundezas da selva amazônica</b>, viveu uma mulher misteriosa conhecida como "A Mulher da Floresta." Ela era uma guardiã da natureza, com olhos profundos que pareciam ver o futuro e um coração ligado à alma da floresta.
  </p>
  <p>
    O povo da região temia e respeitava a Mulher da Floresta. Diziam que ela tinha o poder de curar com suas mãos e prever os desastres que se abateriam sobre a terra. Mas também havia quem a temesse, pois acreditava-se que ela podia amaldiçoar aqueles que ousassem prejudicar a selva.
  </p>
  <br/>
  <p>
  Um dia, um grupo de forasteiros gananciosos chegou à Amazônia, ansiosos para explorar suas riquezas. Eles começaram a derrubar árvores centenárias, poluir rios e desrespeitar a terra. A Mulher da Floresta sentiu a dor da terra e o desespero dos seres que a habitavam.
  </p>
  <br/>
  <p>
  Com lágrimas nos olhos, a Mulher da Floresta proferiu uma terrível profecia: "Aqueles que destruírem a minha casa sofrerão a ira da natureza." Noites de tormentas e dias de escuridão caíram sobre os intrusos. Muitos desapareceram misteriosamente na selva, enquanto outros enlouqueceram.
  </p>
  <br/>
  <p>
    A lenda da Mulher da Floresta persiste, lembrando a todos que a natureza é poderosa e merece respeito. Ela é a guardiã da selva amazônica, disposta a protegê-la a qualquer custo, e seu drama ecoa nas noites sombrias da floresta.
  </p>
  <p>
  Há muito tempo, <b>nas profundezas da selva amazônica</b>, viveu uma mulher misteriosa conhecida como "A Mulher da Floresta." Ela era uma guardiã da natureza, com olhos profundos que pareciam ver o futuro e um coração ligado à alma da floresta.
</p>
<p>
  O povo da região temia e respeitava a Mulher da Floresta. Diziam que ela tinha o poder de curar com suas mãos e prever os desastres que se abateriam sobre a terra. Mas também havia quem a temesse, pois acreditava-se que ela podia amaldiçoar aqueles que ousassem prejudicar a selva.
</p>
<br/>
<p>
Um dia, um grupo de forasteiros gananciosos chegou à Amazônia, ansiosos para explorar suas riquezas. Eles começaram a derrubar árvores centenárias, poluir rios e desrespeitar a terra. A Mulher da Floresta sentiu a dor da terra e o desespero dos seres que a habitavam.
</p>
<br/>
<p>
Com lágrimas nos olhos, a Mulher da Floresta proferiu uma terrível profecia: "Aqueles que destruírem a minha casa sofrerão a ira da natureza." Noites de tormentas e dias de escuridão caíram sobre os intrusos. Muitos desapareceram misteriosamente na selva, enquanto outros enlouqueceram.
</p>
<br/>
<p>
  A lenda da Mulher da Floresta persiste, lembrando a todos que a natureza é poderosa e merece respeito. Ela é a guardiã da selva amazônica, disposta a protegê-la a qualquer custo, e seu drama ecoa nas noites sombrias da floresta.
</p>
<p>
Há muito tempo, <b>nas profundezas da selva amazônica</b>, viveu uma mulher misteriosa conhecida como "A Mulher da Floresta." Ela era uma guardiã da natureza, com olhos profundos que pareciam ver o futuro e um coração ligado à alma da floresta.
</p>
<p>
O povo da região temia e respeitava a Mulher da Floresta. Diziam que ela tinha o poder de curar com suas mãos e prever os desastres que se abateriam sobre a terra. Mas também havia quem a temesse, pois acreditava-se que ela podia amaldiçoar aqueles que ousassem prejudicar a selva.
</p>
<br/>
<p>
Um dia, um grupo de forasteiros gananciosos chegou à Amazônia, ansiosos para explorar suas riquezas. Eles começaram a derrubar árvores centenárias, poluir rios e desrespeitar a terra. A Mulher da Floresta sentiu a dor da terra e o desespero dos seres que a habitavam.
</p>
<br/>
<p>
Com lágrimas nos olhos, a Mulher da Floresta proferiu uma terrível profecia: "Aqueles que destruírem a minha casa sofrerão a ira da natureza." Noites de tormentas e dias de escuridão caíram sobre os intrusos. Muitos desapareceram misteriosamente na selva, enquanto outros enlouqueceram.
</p>
<br/>
<p>
A lenda da Mulher da Floresta persiste, lembrando a todos que a natureza é poderosa e merece respeito. Ela é a guardiã da selva amazônica, disposta a protegê-la a qualquer custo, e seu drama ecoa nas noites sombrias da floresta.
</p>
`;
const Post = () => {
  return (
    <div className="relative min-h-screen bg-black flex justify-center">
      <div className="fixed w-full h-screen bg-[url('/bg_login.jpg')] opacity-20" />
      <div className="relative z-10 w-full max-w-2xl bg-slate-950/70 text-neutral-300 px-5 pt-10 pb-20">
        <Link to={"/"}>
          {/* <ArrowLeft className="h-4 w-4" /> */}
          Voltar
        </Link>

        <div className="flex items-center gap-5 mt-10">
          <div className="h-24 w-24 rounded-full bg-white" />
          <div>
            <h1 className="text-lg font-bold">Lucas Maia</h1>
            <p className="text-neutral-400">Lucas Maia</p>
            <p className="text-neutral-400">16 de setembro de 2023 (editado)</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold overflow-auto mt-5">
          A Lenda da Mulher da Floresta
        </h1>

        <h2 className="mt-5 text-sm opacity-70">
          Lendas de Deuses e Espíritos • Lendas de Encantamento
        </h2>

        <div className="mt-7">{convertStringToHTML(content)}</div>
      </div>
    </div>
  );
};

export default Post;
