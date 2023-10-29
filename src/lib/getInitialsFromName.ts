export function getInitialsFromName(nome?: string) {
  // Divide o nome em palavras usando um espaço em branco como separador
  const palavras = (nome || "")?.split(" ")

  // Inicializa uma variável para armazenar as iniciais
  let iniciais = ""

  // Itera sobre as palavras e pega a primeira letra de cada palavra
  for (const palavra of palavras) {
    iniciais += palavra[0]?.toUpperCase()
  }

  return iniciais
}
