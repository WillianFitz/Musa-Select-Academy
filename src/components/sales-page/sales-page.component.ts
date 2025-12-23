import { ChangeDetectionStrategy, Component, ElementRef, signal, ViewChild, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-page',
  templateUrl: './sales-page.component.html',
  styles: [`
    :host {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-in-out forwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-scroll-fade-in {
      animation: scrollFadeIn 1s ease-out forwards;
      opacity: 0;
    }

    @keyframes scrollFadeIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-pulse-green {
      animation: pulse-green 2s infinite;
    }
    
    .animate-pulse-gold {
      animation: pulse-gold 2s infinite;
    }

    @keyframes pulse-green {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
      }
    }

    @keyframes pulse-gold {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(212, 175, 55, 0);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class SalesPageComponent implements OnInit {
  @ViewChild('vslContainer') vslContainer!: ElementRef<HTMLElement>;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  videoEnded = signal(false);
  isPlaying = signal(false);
  isMuted = signal(false);
  videoStarted = signal(false);
  
  checkoutLink = 'https://pay.kiwify.com.br/Zq9zquU?afid=wYLSSIwg';
  currentYear = new Date().getFullYear();

  whatsappNumber = '554699174777';
  whatsappMessage = 'Olá! Assisti a apresentação e quero tirar umas dúvidas sobre a Mentoria Musa Select Academy!';

  constructor(@Inject(PLATFORM_ID) private platformId: object, private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Simple anti-devtools measures to deter casual snooping.
      // Note: This is not foolproof but acts as a strong deterrent.
      const devToolsCheck = () => {
        const threshold = 160; // milliseconds
        const start = performance.now();
        debugger;
        const end = performance.now();
        if (end - start > threshold) {
          console.clear();
          console.log('%c✋ ALTO!', 'color: red; font-size: 48px; font-weight: bold; -webkit-text-stroke: 1px black;');
          console.log('%cEsta área do site é protegida. Tentar inspecionar o código pode causar instabilidade.', 'font-size: 18px;');
          // This aggressive loop makes the dev tools unusable by constantly triggering the debugger.
          setInterval(() => { debugger; }, 50);
        }
      };

      // Run the check once. If it triggers, it sets up its own disruptive loop.
      setTimeout(devToolsCheck, 500);

      // Prevent common developer tools shortcuts
      window.addEventListener('keydown', event => {
        if (event.key === 'F12' || 
            (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i')) || 
            (event.ctrlKey && event.shiftKey && (event.key === 'J' || event.key === 'j')) || 
            (event.ctrlKey && (event.key === 'U' || event.key === 'u')) ||
            (event.metaKey && event.altKey && (event.key === 'I' || event.key === 'i'))) { // Cmd+Alt+I for Mac
          event.preventDefault();
        }
      }, true); // Use capture phase to catch the event early

      // Prevent right-clicking on the entire component to protect content
      this.elementRef.nativeElement.addEventListener('contextmenu', (event: Event) => {
        event.preventDefault();
      });
    }
  }

  startVideo(): void {
    const video = this.videoPlayer.nativeElement;
    video.play().then(() => {
        this.videoStarted.set(true);
        video.muted = false;
        video.volume = 1;
        this.isMuted.set(false);
    }).catch((error: any) => {
        console.error('Error starting video:', error);
    });
  }

  togglePlayPause(): void {
    const video = this.videoPlayer.nativeElement;
    if (this.isPlaying()) {
      video.pause();
    } else {
      video.play();
    }
  }

  toggleMute(): void {
    const video = this.videoPlayer.nativeElement;
    video.muted = !video.muted;
  }
  
  onVideoEnded(): void {
    this.videoEnded.set(true);
    this.isPlaying.set(false);
  }

  onPlay(): void {
    this.isPlaying.set(true);
  }

  onPause(): void {
    this.isPlaying.set(false);
  }

  onVolumeChange(): void {
    const video = this.videoPlayer.nativeElement;
    this.isMuted.set(video.muted || video.volume === 0);
  }

  products = [
    {
      name: 'Secaps Black',
      description: 'A fórmula avançada para resultados rápidos e eficazes.',
      imageUrlUnlocked: 'https://i.imgur.com/Hy6dWDx.jpeg',
      imageUrlLocked: 'https://i.imgur.com/EiJGG2Y.jpeg'
    },
    {
      name: 'Colágeno Hidrolisado',
      description: 'Firmeza e elasticidade para sua pele, unhas e cabelos.',
      imageUrlUnlocked: 'https://i.imgur.com/f1Lr8Vu.jpeg',
      imageUrlLocked: 'https://i.imgur.com/DTgclwv.jpeg'
    }
  ];

  mentorshipPillars = [
    {
      icon: 'foundation',
      title: 'Pilar 1: Alicerce Sólido',
      description: 'Construa a base inabalável do seu negócio digital. Entenda o mercado, defina seu público e posicione sua marca para o sucesso desde o primeiro dia.',
      topics: [
        'Mindset Empreendedor: A mentalidade para o sucesso.',
        'Nicho e Persona: Encontrando seu cliente ideal.',
        'Estrutura Profissional: Instagram e WhatsApp Business.',
        'Planejamento Estratégico: Metas e objetivos claros.'
      ]
    },
    {
      icon: 'magnetism',
      title: 'Pilar 2: Magnetismo Digital',
      description: 'Aprenda a criar conteúdo que atrai, engaja e conecta. Transforme seus seguidores em fãs e seus fãs em clientes fiéis.',
      topics: [
        'Copywriting Persuasivo: A arte de escrever para vender.',
        'Criação de Conteúdo: Stories que vendem todos os dias.',
        'Identidade Visual: Uma marca que se destaca.',
        'Linha Editorial Infinita: Nunca mais fique sem ideias.'
      ]
    },
    {
      icon: 'empowerment',
      title: 'Pilar 3: Empoderamento em Vendas',
      description: 'Domine as técnicas de tráfego pago e funis de venda para alcançar milhares de pessoas e automatizar seu faturamento.',
      topics: [
        'Tráfego Pago do Zero: Facebook e Instagram Ads.',
        'Funil de Vendas Automático: Venda até enquanto dorme.',
        'Anúncios que Convertem: Criativos de alta performance.',
        'Otimização de Campanhas: Maximizando seu lucro.'
      ]
    },
    {
      icon: 'mastery',
      title: 'Pilar 4: Maestria na Conversão',
      description: 'Feche vendas com confiança e naturalidade. Aprenda a negociar, quebrar objeções e transformar conversas em comissões.',
      topics: [
        'Atendimento Humanizado que Vende.',
        'Script de Vendas Matador para WhatsApp.',
        'Quebra de Objeções: Transforme "não" em "sim".',
        'Pós-venda e Fidelização de Clientes.'
      ]
    }
  ];

  methodComparison = {
    withoutMethod: {
      title: 'O Caminho Lento (Sem o Método)',
      points: [
        'Processo lento de tentativa e erro.',
        'Dinheiro perdido com anúncios que não convertem.',
        'Sentimento de estar perdida e sem direção.',
        'Frustração e desânimo com a falta de resultados.',
        'Ver a concorrência crescer enquanto você fica para trás.',
        'Grande risco de desistir no meio do caminho.'
      ]
    },
    withMethod: {
      title: 'O Caminho Rápido (Com a Mentoria)',
      points: [
        'Processo rápido com um passo a passo validado.',
        'Economia de dinheiro usando estratégias que funcionam.',
        'Clareza total sobre cada etapa do seu negócio.',
        'Motivação com resultados aparecendo más rápido.',
        'Confiança para se destacar e superar a concorrência.',
        'Suporte e comunidade para nunca mais se sentir sozinha.'
      ]
    }
  };

  affiliateConquests = [
    {
      imageUrl: 'https://i.imgur.com/A8MjiYF.jpeg',
      title: 'iPhone 15 Pro Max',
      description: 'Ganhadora do sorteio "Alvo Atingido" de Julho.'
    },
    {
      imageUrl: 'https://i.imgur.com/pKlsjMN.jpeg',
      title: 'Prêmio de R$700,00',
      description: 'Conquistou o 3º lugar em vendas no mês de Julho.'
    },
    {
      imageUrl: 'https://i.imgur.com/H1rbsjR.jpeg',
      title: 'Jantar de Gala Exclusivo',
      description: 'Atingiu +R$20.000 em faturamento em Julho.'
    },
    {
      imageUrl: 'https://i.imgur.com/31GGE4e.jpeg',
      title: 'Viagem para Pipa/RN',
      description: 'Superou R$25.000 em faturamento no mês de Junho.'
    }
  ];

  studentGiveaway = {
    imageUrl: 'https://i.imgur.com/3bjSxCX.jpeg',
    title: 'Sorteios Exclusivos para Alunas!',
    description: 'Como aluna da Musa Select Academy, você não apenas investe no seu conhecimento, mas também tem a chance de ganhar prêmios incríveis! Realizamos sorteios exclusivos para nossas alunas como forma de incentivar e presentear quem está comprometida com o sucesso.',
    caption: 'O próximo sorteio para alunas será de 2 iPhones 17! Um presente para acelerar ainda mais os resultados das nossas Musas.',
    alt: 'Sorteio de 2 iPhones 17 para alunas da mentoria'
  };

  awards = [
    {
      imageUrl: 'https://i.imgur.com/NlohKvF.jpeg',
      description: 'Pulseira Exclusiva MSA'
    },
    {
      imageUrl: 'https://i.imgur.com/bS07Lth.jpeg',
      description: 'Placa de 30K e 100K'
    },
    {
      imageUrl: 'https://i.imgur.com/r7UVdt8.jpeg',
      description: 'Placa 250k e Viagem a Floripa'
    },
    {
      imageUrl: 'https://i.imgur.com/ENpFRIs.jpeg',
      description: 'Placa 500k e Viagem a Paris'
    },
    {
      imageUrl: 'https://i.imgur.com/vKwOGf6.jpeg',
      description: '1 Milhao e Viagem a Dubai'
    },
    {
      imageUrl: 'https://i.imgur.com/5gTALyj.jpeg',
      description: 'Marca de 5 Milhoes'
    },
    {
      imageUrl: 'https://i.imgur.com/OiyVkx8.jpeg',
      description: 'Nivel Grecia'
    },
    {
      imageUrl: 'https://i.imgur.com/6bHtjYt.jpeg',
      description: 'Viagem a Grecia'
    }
  ];

  bestSellerProduct = {
    name: 'Secaps Black',
    description: 'O queridinho das nossas clientes e campeão de vendas. Secaps Black é a fórmula avançada para quem busca resultados rápidos e eficazes na jornada de bem-estar. É o produto que se vende sozinho e garante comissões recorrentes.',
    images: [
      'https://i.imgur.com/FeohkRZ.jpeg',
      'https://i.imgur.com/4koma7R.jpeg',
      'https://i.imgur.com/VyiFOu8.jpeg'
    ]
  };

  mentor = {
    name: 'Pamela Berrido',
    imageUrl: 'https://i.imgur.com/9UVseBo.jpeg',
    bio: 'De vendedora iniciante a mentora de sucesso, eu trilhei o caminho das pedras e descobri os segredos para faturar alto no mercado da beleza. Agora, minha missão é pegar na sua mão e te guiar pelo mesmo caminho, mas de forma muito mais rápida e sem os erros que eu cometi.'
  };

  targetAudience = [
    {
      icon: 'beginner',
      title: 'Para a completa iniciante',
      description: 'Que está perdida, não sabe por onde começar, mas tem uma vontade gigante de vencer e construir seu próprio negócio online.'
    },
    {
      icon: 'frustrated',
      title: 'Para quem já tentou de tudo',
      description: 'E se frustrou com cursos que prometem muito e não entregam nada. Aqui você encontra um método prático e suporte de verdade.'
    },
    {
      icon: 'freedom',
      title: 'Para quem busca liberdade',
      description: 'De tempo, geográfica e financeira. Para mulheres que sonham em ser donas do próprio nariz e ter uma renda que lhes dê segurança.'
    },
    {
      icon: 'community',
      title: 'Para quem quer uma comunidade',
      description: 'E não quer mais se sentir sozinha na jornada. Aqui você terá o apoio de centenas de mulheres com o mesmo objetivo que você.'
    }
  ];

  vipGroup = {
    imageUrl: 'https://i.imgur.com/SvrnrIP.jpeg',
    title: 'Acesso Exclusivo: Faço Parte do Grupo VIP Musa Select',
    description: 'Isso significa que estou na linha de frente, recebendo as estratégias mais avançadas e validadas diretamente da fonte. O que eu ensino na mentoria é exatamente o que as maiores vendedoras do grupo aplicam para faturar alto.'
  };

  studentEarnings = [
    {
      imageUrl: 'https://i.imgur.com/hJWAulR.jpeg',
      caption: 'Mais de R$9.000 em 30 dias'
    },
    {
      imageUrl: 'https://i.imgur.com/5dzAb4H.jpeg',
      caption: 'Meu faturamento consolidado em 30 dias'
    },
    {
      imageUrl: 'https://i.imgur.com/emra2OT.jpeg',
      caption: 'Resultado expressivo em apenas 7 dias'
    },
    {
      imageUrl: 'https://i.imgur.com/iC93Wjs.jpeg',
      caption: 'Mais de R$700 em uma semana'
    },
    {
      imageUrl: 'https://i.imgur.com/w8K0afw.jpeg',
      caption: 'Vendas acontecendo no automático'
    },
    {
      imageUrl: 'https://i.imgur.com/ktdLxAj.jpeg',
      caption: 'As notificações que não param de chegar'
    },
    {
      imageUrl: 'https://i.imgur.com/QjClU72.jpeg',
      caption: 'Vendas em 1 dia'
    }
  ];

  testimonials = [
    { name: 'Juliana Paes', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg', rating: 5, comment: 'A mentoria mudou completamente meu jogo! Em menos de um mês, minhas vendas triplicaram. O método é claro e o suporte é incrível.' },
    { name: 'Camila Alves', avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg', rating: 5, comment: 'Estava perdida, sem saber como começar. A Musa Select Academy me deu o passo a passo que eu precisava. Hoje tenho minha independência financeira.' },
    { name: 'Bruna Marques', avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg', rating: 4, comment: 'Conteúdo muito rico e direto ao ponto. Tive um pouco de dificuldade no início, mas o suporte me ajudou. Recomendo!' },
    { name: 'Mariana Rios', avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg', rating: 5, comment: 'O melhor investimento que fiz na minha carreira. A comunidade de alunas é fantástica, uma ajuda a outra. Já recuperei o valor investido.' },
    { name: 'Sofia Costa', avatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg', rating: 5, comment: 'Finalmente entendi como funcionam os anúncios! As aulas são práticas e o material de apoio é excelente. Superou minhas expectativas.' },
    { name: 'Beatriz Lima', avatarUrl: 'https://randomuser.me/api/portraits/women/6.jpg', rating: 5, comment: 'Eu não vendia nada! Depois da mentoria, fechei meu primeiro mês com R$ 5.000 de faturamento. Só gratidão!' },
    { name: 'Laura Azevedo', avatarUrl: 'https://randomuser.me/api/portraits/women/7.jpg', rating: 4, comment: 'Gostei muito das estratégias de copywriting. Meus anúncios estão muito mais persuasivos agora. Valeu muito a pena.' },
    { name: 'Clara Martins', avatarUrl: 'https://randomuser.me/api/portraits/women/8.jpg', rating: 5, comment: 'A didática é perfeita! Mesmo sendo totalmente leiga, consegui aplicar tudo e ver os resultados aparecerem. Recomendo de olhos fechados.' },
    { name: 'Valentina Gomes', avatarUrl: 'https://randomuser.me/api/portraits/women/9.jpg', rating: 5, comment: 'O acesso aos produtos validados já paga a mentoria. Parei de perder tempo e dinheiro com produtos ruins. Isso é ouro!' },
    { name: 'Helena Ferreira', avatarUrl: 'https://randomuser.me/api/portraits/women/10.jpg', rating: 5, comment: 'Estou amando a comunidade! A troca de experiências com as outras alunas acelera muito o nosso aprendizado. Ninguém fica para trás.' },
    { name: 'Alice Rodrigues', avatarUrl: 'https://randomuser.me/api/portraits/women/11.jpg', rating: 4, comment: 'O curso é denso, muito conteúdo de valor. Precisei rever algumas aulas, mas o importante é que o resultado veio. Estou satisfeita.' },
    { name: 'Manuela Barbosa', avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg', rating: 5, comment: 'Isso não é um curso, é uma transformação de mentalidade e de vida. Obrigada por compartilhar tanto conhecimento.' },
    { name: 'Isabella Castro', avatarUrl: 'https://randomuser.me/api/portraits/women/13.jpg', rating: 5, comment: 'O módulo sobre funil de vendas abriu minha mente. Consegui automatizar meu processo e agora vendo até dormindo!' },
    { name: 'Luísa Correia', avatarUrl: 'https://randomuser.me/api/portraits/women/14.jpg', rating: 5, comment: 'Suporte nota 1000! Sempre que tive uma dúvida, fui respondida rapidamente. Isso faz toda a diferença no processo.' },
    { name: 'Yasmin Cunha', avatarUrl: 'https://randomuser.me/api/portraits/women/15.jpg', rating: 4, comment: 'Ainda estou no começo, mas já vejo uma luz no fim do túnel. O conteúdo é muito bem estruturado e fácil de seguir.' },
    { name: 'Gabriela Dias', avatarUrl: 'https://randomuser.me/api/portraits/women/16.jpg', rating: 5, comment: 'Se você quer resultados de verdade e está cansada de promessas vazias, este é o lugar certo. Direto ao ponto e sem enrolação.' },
    { name: 'Nicole Santos', avatarUrl: 'https://randomuser.me/api/portraits/women/17.jpg', rating: 5, comment: 'Fiz outros cursos antes, mas nenhum se compara. A profundidade do conteúdo e a qualidade da entrega são impecáveis.' },
    { name: 'Melissa Pinto', avatarUrl: 'https://randomuser.me/api/portraits/women/18.jpg', rating: 5, comment: 'Minha única reclamação é não ter encontrado essa mentoria antes! Teria me poupado muito tempo e estresse. Incrível!' },
    { name: 'Lívia Ribeiro', avatarUrl: 'https://randomuser.me/api/portraits/women/19.jpg', rating: 4, comment: 'As aulas ao vivo são um diferencial enorme. Poder tirar dúvidas em tempo real acelera demais o processo de aprendizagem.' },
    { name: 'Esther Almeida', avatarUrl: 'https://randomuser.me/api/portraits/women/20.jpg', rating: 5, comment: 'De dona de casa endividada a empreendedora digital. Essa mentoria foi a virada de chave na minha vida. Gratidão eterna!' },
  ];
  
  scrollToVSL() {
    this.vslContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  get whatsappLink(): string {
    return `https://api.whatsapp.com/send?phone=${this.whatsappNumber}&text=${encodeURIComponent(this.whatsappMessage)}`;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}