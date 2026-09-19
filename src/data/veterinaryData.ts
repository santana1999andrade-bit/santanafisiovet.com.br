import { TherapyModality, TreatedCondition, AlertSymptom, ReviewItem, BlogPost, CoverageRegion, DoctorInfo, HeroContent, AboutContent, SiteData, GoogleIntegrationConfig } from '../types';

export const DOCTOR_INFO: DoctorInfo = {
  name: "Dra. Gabriela Sant'Ana",
  crmv: "CRMV/SP 60.401",
  specialties: "Fisioterapia, Reabilitação Animal e Acupuntura Veterinária",
  whatsappNumber: "5511947427384",
  whatsappFormatted: "(11) 94742-7384",
  instagram: "@fisiovet.gabriela",
  instagramUrl: "https://instagram.com/fisiovet.gabriela",
  email: "contato@santanafisiovet.com.br",
  quote: "Cada paciente possui seu tempo e sua necessidade. O tratamento é desenhado estritamente para o bem-estar e alívio da dor do seu pet.",
  bio: "Médica Veterinária dedicada exclusivamente à Fisiatria, Reabilitação Física e Acupuntura Domiciliar. Atuamos com base em evidências científicas e conduta ética, eliminando o estresse do deslocamento para que o animal seja atendido no ambiente onde ele se sente mais seguro e confiante: o próprio lar.",
  serviceType: "Atendimento 100% Domiciliar",
  locationsShort: "Grande São Paulo, Guarulhos e Cidade de São Paulo"
};

export const INITIAL_HERO: HeroContent = {
  badge: "ATENDIMENTO 100% DOMICILIAR",
  title: "Fisioterapia e Reabilitação",
  titleHighlight: "Veterinária Domiciliar",
  titleLocations: "em Grande São Paulo, Guarulhos e Cidade de São Paulo",
  subtitle: "O cuidado especializado que seu pet precisa, com o conforto e o respeito ao tempo dele, direto na sua casa em Grande São Paulo, Guarulhos e Cidade de São Paulo. Sem o estresse de transporte e com equipamentos portáteis de ponta.",
  imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=80",
  statReviews: "5.0 ★★★★★",
  statLocations: "Grande SP, Guarulhos & SP"
};

export const INITIAL_ABOUT: AboutContent = {
  title: "Dra. Gabriela Sant'Ana",
  specialties: "Fisioterapia, Reabilitação Animal e Acupuntura Veterinária",
  imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=900&q=80",
  quote: "Cada paciente possui seu tempo e sua necessidade. O tratamento é desenhado estritamente para o bem-estar e alívio da dor do seu pet.",
  bio: "Médica Veterinária dedicada exclusivamente à Fisiatria, Reabilitação Física e Acupuntura Domiciliar. Atuamos com base em evidências científicas e conduta ética, eliminando o estresse do deslocamento para que o animal seja atendido no ambiente onde ele se sente mais seguro e confiante: o próprio lar."
};

export const MODALITIES: TherapyModality[] = [
  {
    id: "laserterapia",
    name: "Laserterapia",
    shortDesc: "Estimulação celular profunda, analgesia rápida e potente ação anti-inflamatória.",
    description: "A fotobiomodulação por laser de baixa intensidade acelera a regeneração tecidual, alivia dores agudas e crônicas, diminui edemas e estimula a microcirculação sem causar nenhum desconforto ao paciente.",
    indications: [
      "Pós-operatório ortopédico e cirurgias de coluna",
      "Feridas cirúrgicas e dermatites de cicatrização difícil",
      "Artrose, artrite e bursite",
      "Controle imediato da dor articular"
    ],
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    iconName: "Zap",
    badge: "Indolor & Não Invasivo"
  },
  {
    id: "acupuntura",
    name: "Acupuntura & Moxabustão",
    shortDesc: "Equilíbrio neurológico, analgesia sistêmica e liberação de endorfinas naturais.",
    description: "Baseada na Medicina Tradicional Chinesa e neurofisiologia veterinária moderna. Com agulhas ultrafinas e técnicas de manuseio respeitoso com petiscos, promove alívio profundo de dores de coluna, hérnias e paralisias.",
    indications: [
      "Hérnia de disco (graus I a V) e espondilose",
      "Paralisias, paresias e sequelas neurológicas",
      "Manejo de dor oncológica e dores crônicas",
      "Animais idosos com perda de força nos membros"
    ],
    imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    iconName: "Sparkles",
    badge: "Harmonia & Analgesia"
  },
  {
    id: "cinesioterapia",
    name: "Cinesioterapia Terapêutica",
    shortDesc: "Exercícios guiados com bola feijão, cavaletes e plataformas proprioceptivas.",
    description: "Conjunto de exercícios ativos, passivos e assistidos com foco em ganho de massa muscular, equilíbrio postural, amplitude de movimento e reaprendizagem motora para cães e gatos.",
    indications: [
      "Fortalecimento de membros posteriores atróficos",
      "Treinamento de propriocepção e coordenação motora",
      "Reabilitação de ruptura de ligamento cruzado (TPLO)",
      "Condicionamento físico para pets obesos"
    ],
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
    iconName: "Activity",
    badge: "Recuperação Ativa"
  },
  {
    id: "magnetoterapia",
    name: "Magnetoterapia",
    shortDesc: "Campos eletromagnéticos pulsados para consolidação óssea e relaxamento.",
    description: "Terapia indolor com campos magnéticos que atua na bioeletricidade celular, estimulando a síntese de colágeno, mineralização de fraturas e redução acentuada de processos inflamatórios crônicos.",
    indications: [
      "Consolidação de fraturas complexas e não uniões",
      "Osteoartrose e osteocondrite",
      "Edema ósseo e regeneração celular contínua",
      "Alívio de espasmos para cães e felinos sensíveis"
    ],
    imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80",
    iconName: "Waves",
    badge: "Regeneração Celular"
  },
  {
    id: "massoterapia",
    name: "Massoterapia & Liberação Miofascial",
    shortDesc: "Técnicas manuais para alívio de nós de tensão, contraturas e bem-estar sensorial.",
    description: "Aplicação de manobras manuais especializadas associadas à aromaterapia relaxante segura para animais. Desfaz bandas tensas e contraturas compensatórias desenvolvidas quando o pet mancou por semanas.",
    indications: [
      "Sobrecarga compensatória em patas sadias",
      "Contratura de musculatura paravertebral",
      "Redução de ansiedade e estresse muscular",
      "Estímulo tátil e enriquecimento sensorial para idosos"
    ],
    imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80",
    iconName: "HeartHandshake",
    badge: "Acolhimento & Toque"
  },
  {
    id: "eletroterapia",
    name: "Eletroterapia (TENS & FES)",
    shortDesc: "Estimulação elétrica neuromuscular para controle de dor e ativação muscular.",
    description: "Correntes elétricas terapêuticas dosadas com precisão milimétrica para bloquear sinais de dor antes de chegarem ao cérebro (TENS) ou estimular contrações musculares saudáveis em membros fracos (FES).",
    indications: [
      "Prevenção de atrofia muscular em animais acamados",
      "Dores neuropáticas intensas",
      "Recuperação pós-trauma medular",
      "Reeducação neuromuscular"
    ],
    imageUrl: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80",
    iconName: "Cpu",
    badge: "Estímulo Neurofuncional"
  }
];

export const TREATED_CONDITIONS: TreatedCondition[] = [
  {
    id: "hernia-disco",
    title: "Hérnia de Disco & Problemas de Coluna",
    description: "Tratamento conservador e pós-operatório (laminectomia/hemilaminectomia) para cães de todas as raças, visando retorno do reflexo e da marcha.",
    icon: "ShieldAlert",
    commonIn: "Muito comum em Teckel (Dachshund), Buldogue Francês, Beagle, Shih Tzu e Poodle."
  },
  {
    id: "artrose",
    title: "Osteoartrose e Artrite Crônica",
    description: "Desgaste de cartilagens articulares que causa dor crônica, dificuldade ao levantar pela manhã e perda progressiva de interesse em brincadeiras.",
    icon: "Bone",
    commonIn: "Comum em cães idosos, Golden Retriever, Labrador, Pastor Alemão e gatos senis."
  },
  {
    id: "pos-cirurgico",
    title: "Pós-Cirúrgico Ortopédico (TPLO / Fraturas)",
    description: "Acompanhamento fisioterapêutico desde o pós-imediato para reduzir fibrose, evitar atrofia e garantir que o osso e ligamento cicatrizem perfeitamente.",
    icon: "Stethoscope",
    commonIn: "Ruptura de ligamento cruzado, luxação de patela, fixadores externos e placas."
  },
  {
    id: "neurologia",
    title: "Doenças Neurológicas & Paralisias",
    description: "Sequelas de cinomose, mielopatia degenerativa, AVC em cães e traumas medulares que afetam a postura e a marcha.",
    icon: "Activity",
    commonIn: "Tratamento que visa evitar atrofia e reconectar estímulos neurais com carinho e paciência."
  },
  {
    id: "displasia",
    title: "Displasia Coxofemoral e de Cotovelo",
    description: "Desenvolvimento anormal da articulação do quadril ou cotovelo, aliviando o atrito ósseo e fortalecendo os grupos musculares de suporte.",
    icon: "Layers",
    commonIn: "Rottweiler, Bernese, Labrador, Bulldog Inglês e gatos de porte grande."
  },
  {
    id: "obesidade-geriatria",
    title: "Pets Idosos & Obesidade Animal",
    description: "Programas de exercícios sem impacto para manutenção do peso ideal e alívio do sofrimento gerado pela sobrecarga nas articulações.",
    icon: "HeartPulse",
    commonIn: "Cães e gatos senis com perda de agilidade ou ganho excessivo de peso."
  }
];

export const ALERT_SYMPTOMS: AlertSymptom[] = [
  {
    id: "s1",
    label: "Dificuldade ou relutância para se levantar após repouso",
    severity: "high",
    description: "Geralmente indica dores articulares (artrose) ou compressão espinhal incipiente."
  },
  {
    id: "s2",
    label: "Mancar ou poupar uma das patinhas ao caminhar",
    severity: "moderate",
    description: "Sinal clássico de dor, lesão ligamentar ou trauma que necessita avaliação imediata."
  },
  {
    id: "s3",
    label: "Recusa súbita para subir ou descer do sofá/cama/carro",
    severity: "high",
    description: "Frequente em problemas na coluna lombar/cervical ou displasia coxofemoral."
  },
  {
    id: "s4",
    label: "Arraste de unhas no chão ou perda de sensibilidade nas patas",
    severity: "urgent",
    description: "Alerta neurológico urgente! Pode significar evolução de hérnia de disco."
  },
  {
    id: "s5",
    label: "Choro, ganido ou agressividade atípica ao ser tocado no dorso",
    severity: "urgent",
    description: "Episódio de dor aguda na coluna vertebral que demanda analgesia controlada."
  },
  {
    id: "s6",
    label: "Queda no nível de atividade, apatia e perda de interesse em passeios",
    severity: "moderate",
    description: "Muitas vezes confundido com 'apenas velhice', mas frequentemente é dor crônica tratável."
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    author: "Juliana Mendes & Thor",
    petName: "Thor",
    petType: "Dachshund (Teckel), 5 anos",
    condition: "Hérnia de Disco Grau IV com perda de locomoção traseira",
    location: "Guarulhos (Bosque Maia)",
    rating: 5,
    date: "Há 2 semanas",
    comment: "A Dra. Gabriela foi um anjo na vida do Thor! Ele parou de andar de uma hora para outra por causa da hérnia. Como ele é extremamente nervoso na clínica, o atendimento em casa fez toda a diferença. Com laser e acupuntura, em 4 semanas ele já estava ficando em pé sozinho e hoje voltou a correr pelo quintal!",
    verified: true
  },
  {
    id: "r2",
    author: "Carlos Eduardo & Pipoca",
    petName: "Pipoca",
    petType: "Gato Siamês, 11 anos",
    condition: "Artrose Lombar & Dificuldade para pular",
    location: "São Paulo (Tucuruvi)",
    rating: 5,
    date: "Há 1 mês",
    comment: "Eu tinha muito medo de como meu gato ia reagir a agulhas de acupuntura. A Dra. Gabriela tem uma paciência infinita e um respeito admirável pelo tempo do animal. Pipoca nem percebeu a sessão porque comia petisco tranquilamente. A melhora no humor e no apetite dele foi impressionante!",
    verified: true
  },
  {
    id: "r3",
    author: "Renata Vasconcelos & Luna",
    petName: "Luna",
    petType: "Golden Retriever, 9 anos",
    condition: "Pós-operatório de TPLO (Ligamento Joelho)",
    location: "Alphaville / Barueri",
    rating: 5,
    date: "Há 3 semanas",
    comment: "Colocar a Luna no porta-malas para levar na clínica pós-cirurgia era um pesadelo e machucava o joelho recém-operado. Ter a Dra. Gabriela trazendo todo o equipamento de laser e cinesioterapia aqui em casa foi a melhor decisão. Recuperação 100% perfeita sem nenhuma intercorrência.",
    verified: true
  },
  {
    id: "r4",
    author: "Marcelo & Mel",
    petName: "Mel",
    petType: "Shih Tzu, 8 anos",
    condition: "Contraturas musculares e dores cervicais",
    location: "Arujá",
    rating: 5,
    date: "Há 1 mês",
    comment: "Profissionalismo impecável! A Dra. Gabriela explica cada detalhe com amor e embasamento científico. Dá para ver o alívio imediato no olhar da Mel durante a massoterapia e o laser. Recomendo de olhos fechados!",
    verified: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Como Reconhecer a Dor Silenciosa em Cães e Gatos",
    slug: "dor-silenciosa-em-caes-e-gatos",
    category: "Dicas de Cuidado",
    summary: "Animais raramente choram ou ganem quando sentem dor crônica. Entenda as alterações sutis de postura, sono e comportamento que indicam sofrimento articular.",
    content: [
      "Ao contrário dos seres humanos, que verbalizam desconforto, os animais preservam instintivamente o comportamento de disfarçar fraquezas para não parecerem vulneráveis.",
      "Em cães, a dor crônica provocada por artrose ou hérnia de disco manifesta-se tipicamente como relutância em subir escadas, demora para levantar da caminha pela manhã, lambedura insistente de uma articulação ou respiração ofegante em repouso.",
      "Já em felinos, os sinais são ainda mais discretos: deixar de subir em locais altos favoritos, urinar fora da caixa de areia devido à dificuldade de transpor a borda, agressividade inesperada ao receber carinho na coluna ou desleixo com a higiene dos pelos.",
      "A fisioterapia veterinária domiciliar atua diretamente no foco da dor, devolvendo o conforto sem exigir que o animal encare o estresse do trânsito até uma clínica."
    ],
    imageUrl: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=800&q=80",
    readTime: "3 min de leitura",
    date: "Dicas Clínicas"
  },
  {
    id: "post-2",
    title: "Acupuntura em Felinos: Por Que Funciona Tão Bem?",
    slug: "acupuntura-em-felinos-beneficios",
    category: "Acupuntura",
    summary: "Descubra como a medicina integrativa pode ser aplicada em gatos de forma amigável, sem contenção agressiva e com relaxamento profundo.",
    content: [
      "Muitos tutores imaginam que é impossível colocar agulhas em um gato sem estresse. No entanto, na fisioterapia domiciliar, o procedimento é completamente diferente de um ambiente hospitalar.",
      "Trabalhamos no chão da sala ou no cantinho preferido do gato, com petiscos altamente palatáveis, toalhas com o cheiro da casa e iluminação suave. As agulhas de acupuntura veterinária são extremamente finas (muito menores que agulhas de vacina).",
      "Assim que os pontos são estimulados, o organismo do felino libera opioides endógenos e neurotransmissores calmantes. Não é raro ver o paciente ronronar e cochilar durante a sessão!",
      "A acupuntura é uma grande aliada contra dores da coluna, sequelas renais e distúrbios neurológicos em gatos idosos."
    ],
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    readTime: "4 min de leitura",
    date: "Diário de Casos"
  },
  {
    id: "post-3",
    title: "Pós-Operatório de Coluna e Ortopedia: Cuidados Essenciais nos Primeiros 15 Dias",
    slug: "pos-operatorio-coluna-cuidados",
    category: "Laserterapia",
    summary: "Dicas práticas para manter o ambiente doméstico seguro, evitar piso escorregadio e como o laser domiciliar acelera a consolidação cirúrgica.",
    content: [
      "Os primeiros 15 dias após uma intervenção de laminectomia ou cirurgia ortopédica (como TPLO para joelho) são cruciais para o sucesso de todo o procedimento.",
      "O tutor deve restringir o espaço do animal, utilizando tapetes antiderrapantes (como tatames de EVA ou passadeiras emborrachadas) em todas as áreas de circulação para impedir escorregões que possam romper suturas ou placas.",
      "A aplicação de laserterapia domiciliar logo nos primeiros dias reduz significativamente o inchaço, combate a dor no local da incisão e estimula a proliferação celular rápida.",
      "A Dra. Gabriela orienta a família sobre o posicionamento ideal da caminha, técnicas corretas de sustentação com toalha de apoio e exercícios passivos seguros."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80",
    readTime: "4 min de leitura",
    date: "Orientações ao Tutor"
  },
  {
    id: "post-4",
    title: "Cinesioterapia: A Importância da Bola Feijão e dos Exercícios Guiados",
    slug: "cinesioterapia-bola-feijao-exercicios",
    category: "Cinesioterapia",
    summary: "Saiba por que exercícios proprioceptivos são vitais para cães que perderam massa muscular nas patas traseiras.",
    content: [
      "Quando um pet fica semanas mancando ou em repouso, a perda de massa muscular (atrofia) acontece rapidamente. Apenas deixar o animal andar solto não é suficiente para reabilitar o membro afetado.",
      "A cinesioterapia veterinária utiliza equipamentos especializados como a 'bola feijão', pranchas de equilíbrio e pequenos obstáculos. O piso instável obriga a musculatura profunda e os ligamentos a trabalharem de forma segura e dosada.",
      "Cada sessão é planejada respeitando a fadiga biológica do animal, sem forçar além do limite e sempre recompensando cada pequeno progresso.",
      "O resultado é um ganho visível de firmeza e alegria na caminhada do cãozinho."
    ],
    imageUrl: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=800&q=80",
    readTime: "3 min de leitura",
    date: "Reabilitação Prática"
  }
];

export const COVERAGE_REGIONS: CoverageRegion[] = [
  {
    city: "Guarulhos",
    badge: "Atendimento Domiciliar",
    description: "Atendimento no conforto e tranquilidade do próprio lar, sem o estresse de deslocamento.",
    neighborhoods: [
      "Atendimento Domiciliar em toda a cidade de Guarulhos"
    ]
  },
  {
    city: "Cidade de São Paulo",
    badge: "Atendimento Domiciliar",
    description: "Rotas programadas para atendimento domiciliar especializado no conforto da sua residência.",
    neighborhoods: [
      "Atendimento Domiciliar em todas as regiões da capital"
    ]
  },
  {
    city: "Grande São Paulo",
    badge: "Atendimento Domiciliar",
    description: "Deslocamento planejado com rotas sob agendamento para máximo bem-estar e recuperação do seu pet.",
    neighborhoods: [
      "Região metropolitana sob agendamento prévio de rota"
    ]
  }
];

export const INITIAL_GOOGLE_INTEGRATION: GoogleIntegrationConfig = {
  enabled: true,
  businessName: "Sant'Ana Fisioterapia & Reabilitação Veterinária",
  placeId: "ChIJ_santana_fisiovet_sp",
  googleMapsUrl: "https://share.google/iOCFqF29KqiwEHT8S",
  googleReviewUrl: "https://share.google/iOCFqF29KqiwEHT8S",
  rating: 5.0,
  totalReviews: 48,
  lastSyncedAt: "Hoje, em tempo real",
  embedWidgetCode: "",
};

export const FAQS = [
  {
    question: "Como funciona a primeira avaliação fisioterapêutica domiciliar?",
    answer: "A Dra. Gabriela Sant'Ana vai até a sua residência com todos os equipamentos necessários. Na primeira consulta, é realizada uma anamnese detalhada, análise de exames prévios (raio-x, tomografia, ressonância, laudos cirúrgicos), avaliação física completa (amplitude articular, palpação de pontos de dor e reflexos neurológicos) e já se inicia a primeira sessão terapêutica para alívio imediato."
  },
  {
    question: "Meu pet sente dor durante a acupuntura ou laserterapia?",
    answer: "Não! Esse é um dos maiores receios dos tutores. As agulhas de acupuntura são extremamente finas e indolores, aplicadas de forma paciente e com petiscos. O laserterapia não esquenta de forma incômoda nem queima; ele emite uma luz terapêutica confortável que produz alívio imediato da dor. A imensa maioria dos animais dorme ou relaxa profundamente durante a sessão."
  },
  {
    question: "Preciso ter encaminhamento de outro médico veterinário?",
    answer: "O encaminhamento do veterinário clínico geral ou cirurgião ortopedista é muito bem-vindo e facilita o alinhamento da conduta, mas se o seu pet ainda não tem encaminhamento, a Dra. Gabriela realizará o exame físico e solicitará os exames complementares necessários em conjunto com a equipe que já cuida do seu animal."
  },
  {
    question: "Quantas sessões são necessárias para o pet se recuperar?",
    answer: "O plano terapêutico é estritamente personalizado de acordo com o diagnóstico e a resposta biológica do animal. Quadros agudos ou pós-operatórios costumam ter frequência inicial de 1 a 2 sessões semanais, sendo espaçadas conforme a melhora clínica e ganho de autonomia."
  },
  {
    question: "O que preciso preparar na minha casa para o dia do atendimento?",
    answer: "Apenas um espaço tranquilo, como uma sala com boa iluminação e onde o pet se sinta à vontade (sem barulho de obras ou outros animais interferindo). A Dra. Gabriela leva colchonete higienizado, aparelhos portáteis, toalhas e materiais de suporte. O tutor pode acompanhar toda a sessão e aprender exercícios para o dia a dia."
  }
];

export const INITIAL_SITE_DATA: SiteData = {
  doctorInfo: DOCTOR_INFO,
  hero: INITIAL_HERO,
  about: INITIAL_ABOUT,
  coverageRegions: COVERAGE_REGIONS,
  reviews: REVIEWS,
  modalities: MODALITIES,
  blogPosts: BLOG_POSTS,
  googleIntegration: INITIAL_GOOGLE_INTEGRATION,
  faqs: FAQS,
};
