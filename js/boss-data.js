window.VORTRYA_BOSSES = {
  voltarex: {
    name: "Voltarex",
    title: "Dragão de Plasma Elétrico",
    description:
      "Uma entidade de pura energia e tempestade. Voltarex controla os\n              céus com sua velocidade e poder destrutivo, sendo um dos seres\n              mais temidos de Vortrya.",
    image: "imagens/Voltarex.png",
    element: "Elétrico",
    categories: ["endgame", "epico"],
    phases: 3,
    difficulty: "★★★★★",
    tags: ["ENDGAME", "RAID", "ÉPICO"],
    details:
      '<section class="boss-info-grid" id="lore">\n<div class="boss-panel">\n<span class="panel-label"> MECÂNICA PRINCIPAL </span>\n<p>\n              Ultra-rápido, com ataques que cobrem grandes áreas em padrões\n              previsíveis mas exigem reflexos excepcionais. Carrega energia\n              antes de ataques devastadores.\n            </p>\n<span class="panel-label purple-text"> VULNERABILIDADES </span>\n<p>\n<i class="fa-solid fa-diamond"></i>\n              Predição de movimentos e interrupção do carregamento de energia\n              com habilidades de atordoamento.\n            </p>\n<span class="panel-label red-text"> FASE FINAL </span>\n<p>\n              Na fase final, entra em modo berserk com velocidade dobrada, mas\n              defesa reduzida.\n            </p>\n</div>\n<div class="boss-panel">\n<span class="panel-label purple-text"> ATAQUES PRINCIPAIS </span>\n<div class="attack">\n<i class="fa-solid fa-bolt"></i>\n<div>\n<strong>RAIO CELESTIAL</strong>\n<p>Dispara múltiplos raios em área ampla.</p>\n</div>\n</div>\n<div class="attack">\n<i class="fa-solid fa-wand-sparkles"></i>\n<div>\n<strong>INVESTIDA ELÉTRICA</strong>\n<p>Avança em linha reta em alta velocidade.</p>\n</div>\n</div>\n<div class="attack">\n<i class="fa-solid fa-circle-radiation"></i>\n<div>\n<strong>EXPLOSÃO DE PLASMA</strong>\n<p>Libera uma explosão ao redor do corpo.</p>\n</div>\n</div>\n<div class="attack">\n<i class="fa-solid fa-bolt-lightning"></i>\n<div>\n<strong>SOBRECARGA</strong>\n<p>Carrega energia e libera um ataque devastador.</p>\n</div>\n</div>\n</div>\n</section>\n<section class="boss-phases">\n<div class="section-title">\n<i class="fa-solid fa-bolt"></i>\n            FASES DA BATALHA\n          </div>\n<div class="phases-grid">\n<div class="phase phase-one">\n<img alt="Fase 1" src="imagens/Voltarex.png"/>\n<div>\n<span>FASE 1</span>\n<strong>100% - 66% HP</strong>\n<p>Movimentos rápidos e ataques elétricos em área média.</p>\n</div>\n</div>\n<div class="phase phase-two">\n<img alt="Fase 2" src="imagens/Voltarex.png"/>\n<div>\n<span>FASE 2</span>\n<strong>66% - 33% HP</strong>\n<p>\n                  Novos padrões de ataque e aumento da frequência das\n                  habilidades.\n                </p>\n</div>\n</div>\n<div class="phase phase-three">\n<img alt="Fase 3" src="imagens/Voltarex.png"/>\n<div>\n<span>FASE 3</span>\n<strong>33% - 0% HP</strong>\n<p>\n                  Modo berserk ativado. Velocidade dobrada e ataques\n                  devastadores.\n                </p>\n</div>\n</div>\n</div>\n</section>\n<section class="boss-bottom-grid" id="recompensas">\n<div class="boss-panel rewards">\n<div class="section-title">\n<i class="fa-solid fa-gift"></i>\n              RECOMPENSAS PRINCIPAIS\n            </div>\n<div class="reward-list">\n<div class="reward">\n<span>Escama de Voltarex</span>\n</div>\n<div class="reward">\n<span>Núcleo de Plasma</span>\n</div>\n<div class="reward">\n<span>Garra Eletrificada</span>\n</div>\n<div class="reward">\n<span>Coração da Tempestade</span>\n</div>\n</div>\n</div>\n<div class="boss-panel curiosities">\n<div class="section-title">CURIOSIDADES</div>\n<p>\n<i class="fa-solid fa-diamond"></i>\n              Voltarex é considerado o senhor das tempestades em Vortrya.\n            </p>\n<p>\n<i class="fa-solid fa-diamond"></i>\n              Sua energia é tão intensa que distorce o próprio espaço ao seu\n              redor.\n            </p>\n<p>\n<i class="fa-solid fa-diamond"></i>\n              Sua aparição anuncia mudanças climáticas extremas em todo o\n              continente.\n            </p>\n</div>\n</section>\n<div class="boss-quote">\n          "Os céus se rasgam, os trovões anunciam. A tempestade tem nome:\n          Voltarex."\n        </div>',
  },
  crystallis: {
    name: "Crystallis",
    title: "Guardião de Gelo",
    description:
      "Uma criatura ancestral revestida por cristais congelados que\n                domina regiões cobertas por neve.",
    image: "imagens/Crystallis.png",
    element: "Gelo",
    categories: ["epico"],
    phases: 3,
    type: "Entidade de Cristal Elemental",
    mechanic:
      "Manipula energia congelada, criando zonas de dano contínuo no cenário e congelando jogadores desprevenidos.",
    vulnerability:
      "Impactos pesados quebram sua armadura de cristal; calor concentrado (habilidades de fogo) causa dano amplificado.",
    phaseSummary:
      "Na fase final, fragmenta-se em múltiplos cristais que devem ser destruídos simultaneamente.",
  },
  umbravore: {
    name: "Umbravore",
    title: "Devorador de Sombras",
    description:
      "Uma entidade das trevas capaz de consumir energia e desaparecer\n                completamente dentro das sombras.",
    image: "imagens/Umbravore.png",
    element: "Sombrio",
    categories: ["endgame"],
    phases: 2,
    type: "Ser das Sombras",
    mechanic:
      "Teletransporta-se constantemente e divide-se em cópias ilusórias. Apenas uma cópia é real — identificar qual exige observação de padrões de ataque.",
    vulnerability:
      "Habilidades de área revelam a entidade real; coordenação perfeita da equipe é obrigatória.",
    phaseSummary:
      "Na segunda fase, cria até 4 cópias simultâneas e inverte controles dos jogadores periodicamente.",
  },
  titanusprime: {
    name: "Titanus Prime",
    title: "Colosso Mecânico",
    description:
      "Uma máquina de guerra colossal construída para enfrentar grupos\n                inteiros de caçadores simultaneamente.",
    image: "imagens/TitanusPrime.png",
    element: "Mecânico",
    categories: ["raid"],
    phases: 4,
    type: "Construto Mecânico Ancião",
    mechanic:
      "Combina força bruta com padrões algorítmicos que aprendem com o estilo de jogo da equipe. Cada encontro é ligeiramente diferente.",
    vulnerability:
      "Partes mecânicas expostas (juntas, núcleo de energia) são alvos prioritários; mudar estratégia constantemente confunde sua IA.",
    phaseSummary:
      "O chefe mais complexo do jogo, exigindo domínio de todas as mecânicas aprendidas anteriormente.",
  },
  ionizal: {
    name: "Ionizal",
    title: "Profeta das Cinzas",
    description:
      "Uma criatura envolta em chamas e cinzas que transforma o campo\n                de batalha em uma zona de destruição.",
    image: "imagens/Ionizal.png",
    element: "Cinzas",
    categories: ["epico"],
    phases: 3,
    type: "Entidade Primordial das Cinzas",
    classification: "Épico",
    mechanic:
      "Controla chamas e cinzas ionizadas, transformando progressivamente o campo de batalha em uma região instável. Seus ataques deixam rastros incandescentes que explodem após alguns segundos. Quanto mais tempo o combate dura, maior se torna a temperatura do ambiente e mais perigosas ficam suas habilidades.",
    vulnerability:
      "Durante a preparação de seus ataques mais poderosos, Ionizal expõe seu núcleo energético. Ataques precisos nesse intervalo interrompem temporariamente sua concentração e reduzem a intensidade das chamas.",
    phaseSummary:
      "Na fase final, libera sua energia primordial, ampliando drasticamente o alcance dos ataques e reduzindo os intervalos entre eles.",
    phaseDetails: [
      "Utiliza ataques de fogo e explosões localizadas.",
      "Espalha tempestades de cinzas e cria zonas de calor extremo.",
      "Libera sua energia primordial, ampliando drasticamente o alcance dos ataques e reduzindo os intervalos entre eles.",
    ],
  },
  abyssion: {
    name: "Abyssion",
    title: "Terror Abissal",
    description:
      "Uma presença monstruosa vinda das profundezas que distorce o\n                ambiente ao seu redor.",
    image: "imagens/Abyssion.png",
    element: "Abissal",
    categories: ["endgame"],
    phases: 4,
    type: "Entidade Primordial Abissal",
    classification: "Abissal",
    mechanic:
      "Manipula energia abissal, distorcendo o espaço ao seu redor e criando áreas de pressão extrema. Consegue gerar vórtices que atraem jogadores, alterar temporariamente a percepção de distância e executar ataques que exigem posicionamento preciso. Sua presença torna o cenário progressivamente mais instável.",
    vulnerability:
      "Após utilizar habilidades de distorção espacial, Abyssion apresenta um breve período de instabilidade energética. Durante esse intervalo, seu núcleo fica vulnerável a ataques coordenados. Observar os padrões de distorção permite antecipar suas movimentações.",
    phaseSummary:
      "Na fase final, libera sua verdadeira energia abissal, transformando o campo de batalha e exigindo domínio de movimentação, previsão e coordenação.",
    phaseDetails: [
      "Utiliza ataques abissais e vórtices gravitacionais.",
      "Começa a distorcer regiões da arena e alterar o posicionamento dos jogadores.",
      "Combina múltiplas distorções e ataques em sequência.",
      "Libera sua verdadeira energia abissal, transformando o campo de batalha e exigindo domínio de movimentação, previsão e coordenação.",
    ],
  },
};
