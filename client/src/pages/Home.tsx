import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  ArrowUpRight, 
  Check, 
  Download, 
  Zap, 
  MessageSquare, 
  Calendar, 
  Users, 
  Award, 
  Volume2, 
  ShieldAlert, 
  GraduationCap, 
  BookOpen, 
  Globe, 
  Briefcase,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Trophy,
  Mic,
  Bookmark,
  X
} from "lucide-react";

interface TelegramPost {
  id: number;
  date: string;
  title: string;
  text: string;
  views: string;
  link: string;
}

export default function Home() {
  // Privacy & Cookies State
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Active Category for Speaking Topics
  const [activeTopicCategory, setActiveTopicCategory] = useState("ai");

  // Cookie Consent Check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) {
        setShowCookieBanner(true);
      }
    }
  }, []);

  // Dynamic Telegram Posts State
  const [tgPosts, setTgPosts] = useState<TelegramPost[]>([
    {
      id: 1,
      date: "Вчера",
      title: "Каждый пятый скрывает ИИ: Теневой ИИ на рабочем месте",
      text: "По статистике, более 20% сотрудников тайно используют ChatGPT и другие ИИ-инструменты для выполнения своих рабочих задач, не сообщая об этом руководству. Почему это происходит? Потому что регламенты отстают от реальности. Вместо запретов бизнесу пора возглавить этот процесс и дать легальные инструменты.",
      views: "4.2K",
      link: "https://t.me/ParfunA"
    },
    {
      id: 2,
      date: "3 дня назад",
      title: "Как два болтуна изобрели возраст: Маркетинг теории поколений",
      text: "Теория поколений (X, Y, Z, Альфа) — это не строгая академическая наука, а гениальный маркетинговый фреймворк, созданный Штраусом и Хоувом. Бренды тратят миллионы на адаптацию под зумеров, хотя ключевой фактор — не год рождения, а контекст потребления и уровень цифровой гигиены. ИИ позволяет делать гиперперсонализацию без этих ярлыков.",
      views: "5.1K",
      link: "https://t.me/ParfunA"
    },
    {
      id: 3,
      date: "1 неделя назад",
      title: "Ватикан зашел на территорию Кремниевой долины",
      text: "Папа Римский Лев XIV выпустил официальный документ Magnifica humanitas, посвященный ИИ и цифровой этике. Когда религиозные институты такого масштаба начинают регулировать технологические монополии, это знак: ИИ перестал быть просто технической игрушкой. Это новый базис человеческой цивилизации.",
      views: "3.9K",
      link: "https://t.me/ParfunA"
    },
    {
      id: 4,
      date: "2 недели назад",
      title: "ИИ-агенты в продажах: от автоответчиков к закрытию сделок",
      text: "Забудьте про тупые чат-боты из 2018-го. Современные ИИ-агенты умеют квалифицировать лиды, отрабатывать сложные B2B-возражения и вести клиента до оплаты по кастомному сценарию. Главное — правильно настроить базу знаний и не давать модели выдумывать факты.",
      views: "4.8K",
      link: "https://t.me/ParfunA"
    },
    {
      id: 5,
      date: "3 недели назад",
      title: "Узкое горлышко внедрения ИИ — это саботаж команды",
      text: "Собственник покупает подписки, нанимает интеграторов, а сотрудники тихо саботируют внедрение, боясь увольнения или усложнения работы. Решение: прозрачная система мотивации, обучение за счет компании и позиционирование ИИ как личного ассистента, а не конкурента.",
      views: "5.5K",
      link: "https://t.me/ParfunA"
    },
    {
      id: 6,
      date: "1 месяц назад",
      title: "Как оценить реальный ROI от внедрения нейросетей",
      text: "Если вы внедрили ИИ просто «чтобы было», вы слили бюджет. Реальный ROI считается в сэкономленных часах рутины, сокращении времени вывода продукта на рынок (Time-to-Market) и росте конверсии в продажах. Сначала считаем экономику, потом пишем код.",
      views: "6.2K",
      link: "https://t.me/ParfunA"
    }
  ]);

  const [visibleTgPostsCount, setVisibleTgPostsCount] = useState(3);

  // Dynamic fetching of Telegram posts from public channel preview via CORS proxy
  useEffect(() => {
    async function fetchTelegramPosts() {
      const cb = Date.now();
      const targetUrl = `https://t.me/s/ParfunA?cb=${cb}`;
      let html = "";

      // Try codetabs proxy first (raw HTML, no cache, highly reliable)
      try {
        const response = await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(targetUrl)}`);
        if (response.ok) {
          html = await response.text();
        }
      } catch (e) {
        console.warn("Codetabs proxy failed, trying fallback...", e);
      }

      // Try allorigins as fallback (JSON wrapped, cached but cache-busted by cb param)
      if (!html) {
        try {
          const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
          if (response.ok) {
            const data = await response.json();
            html = data.contents || "";
          }
        } catch (e) {
          console.warn("Allorigins fallback failed...", e);
        }
      }

      if (!html) {
        console.warn("All proxies failed, using high-quality pre-seeded static content.");
        return;
      }

      try {
        // Simple DOM parsing of telegram web channel widgets
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        // Get up to 9 message wraps to support "Show more" button
        const messageElements = Array.from(doc.querySelectorAll(".tgme_widget_message_wrap")).slice(-9).reverse();
        
        if (messageElements.length > 0) {
          const parsedPosts: TelegramPost[] = messageElements.map((el, index) => {
            const textEl = el.querySelector(".tgme_widget_message_text");
            const viewsEl = el.querySelector(".tgme_widget_message_views");
            const dateEl = el.querySelector(".tgme_widget_message_date time");
            const linkEl = el.querySelector(".tgme_widget_message_date");
            
            let text = textEl ? textEl.textContent || "" : "";
            // Clean up raw text if needed
            let title = text.split("\n")[0] || "Пост из Telegram";
            if (title.length > 60) {
              title = title.slice(0, 57) + "...";
            }
            
            // If first line was used as title, remove it from the preview text body
            if (text.startsWith(title)) {
              text = text.replace(title, "").trim();
            }
            
            return {
              id: index + 1,
              date: dateEl ? dateEl.textContent || "Недавно" : "Недавно",
              title: title,
              text: text || "Читать подробнее в Telegram-канале.",
              views: viewsEl ? viewsEl.textContent || "3.5K" : "3.5K",
              link: linkEl ? (linkEl as HTMLAnchorElement).href || "https://t.me/ParfunA" : "https://t.me/ParfunA"
            };
          });
          
          setTgPosts(parsedPosts);
        }
      } catch (e) {
        console.warn("Failed to parse fetched telegram HTML, using static content.", e);
      }
    }
    
    fetchTelegramPosts();
  }, []);

  // Accept Cookies handler
  const handleAcceptCookies = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookie-consent", "accepted");
      setShowCookieBanner(false);
    }
  };

  // Speaking Topics list
  const speakingTopics = {
    ai: [
      {
        title: "Как искусственный интеллект меняет бизнес-модели",
        desc: "Прагматичный разбор внедрения ИИ-агентов в операционные процессы без иллюзий и хайпа."
      },
      {
        title: "Этические, философские и юридические вопросы ИИ",
        desc: "Кто отвечает за ошибки нейросетей? Авторское право на генеративный контент и защита данных."
      },
      {
        title: "Почему ИИ не заменит человека, но изменит все",
        desc: "Как перестроить мышление команды и подготовить сотрудников к работе в связке с ИИ-коллегами."
      },
      {
        title: "Будущее синтетических медиа и виртуальные инфлюенсеры",
        desc: "Кейсы создания цифровых аватаров и AI-маскотов, которые продают 24/7 без выгорания."
      }
    ],
    marketing: [
      {
        title: "Маркетинг будущего: Гиперперсонализация на базе данных",
        desc: "Как ИИ перестраивает воронки продаж, прогнозирует спрос и автоматизирует создание креативов."
      },
      {
        title: "Синтетические инфлюенсеры и новые медиаформаты",
        desc: "Как бренды создают собственных цифровых блогеров и уходят от зависимости от живых инфлюенсеров."
      },
      {
        title: "Этика и прозрачность цифровых коммуникаций",
        desc: "Как сохранить доверие аудитории в эпоху дипфейков и тотальной генерации контента."
      }
    ],
    personal_brand: [
      {
        title: "Личный бренд предпринимателя в эпоху ИИ",
        desc: "Как выстроить твердое позиционирование, когда производство контента стало бесплатным и массовым."
      },
      {
        title: "Telegram как главный канал продаж и влияния в B2B",
        desc: "Стратегия создания, продвижения и монетизации экспертных Telegram-каналов на примере «Полезного Парфуна»."
      },
      {
        title: "Автоматизация контент-маркетинга без потери души",
        desc: "Как использовать ИИ для генерации смыслов и дистрибуции контента, оставаясь настоящим."
      }
    ],
    media: [
      {
        title: "Цифровая трансформация медиаиндустрии",
        desc: "Как ИИ меняет редакции, оптимизирует производство контента и снижает косты в разы."
      },
      {
        title: "Будущее видеопроизводства и генеративные технологии",
        desc: "Обзор инструментов создания видео, виртуальных студий и синтеза речи для медиа-холдингов."
      }
    ]
  };

  // Animation variants
  const fadeInScroll = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] as any // Snappy physics ease-out
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1] as any
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1A1A1A] selection:bg-[#0038FF] selection:text-white font-sans antialiased">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#F5F2EB]/95 backdrop-blur-md border-b-2 border-[#1A1A1A]">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-black text-xl tracking-tight font-display bg-[#0038FF] text-white px-2.5 py-0.5">
              ПАРФУН
            </span>
            <span className="hidden sm:inline-block text-xs font-bold tracking-widest text-[#1A1A1A]/60 uppercase">
              AI BUSINESS ADVISOR
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider">
            <a href="#about" className="hover:text-[#0038FF] transition-colors">Обо мне</a>
            <a href="#services" className="hover:text-[#0038FF] transition-colors">Услуги</a>
            <a href="#methodology" className="hover:text-[#0038FF] transition-colors">Методология</a>
            <a href="#speaking" className="hover:text-[#0038FF] transition-colors">Выступления</a>
            <a href="#blog" className="hover:text-[#0038FF] transition-colors">Блог</a>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href="https://t.me/ParfunA" 
              target="_blank" 
              rel="noreferrer" 
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-[#1A1A1A] text-white px-3 py-1.5 border border-black hover:bg-[#0038FF] hover:border-[#0038FF] transition-all"
            >
              <Send className="h-3 w-3 fill-current" /> Канал
            </a>
            <a 
              href="#contact" 
              className="text-xs font-black uppercase tracking-wider border-2 border-[#1A1A1A] bg-[#0038FF] text-white px-4 py-1.5 hover:bg-[#F5F2EB] hover:text-[#1A1A1A] transition-all punk-shadow"
            >
              Записаться
            </a>
          </div>
        </div>
      </header>

      {/* TOP TELEGRAM BAR */}
      <div className="bg-[#0038FF] text-white py-2.5 border-b-2 border-[#1A1A1A] overflow-hidden">
        <div className="container flex items-center justify-between text-xs sm:text-sm font-black uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="bg-white text-[#0038FF] text-[10px] px-1.5 py-0.5 font-extrabold rounded-none">TG</span>
            <span>ПОДПИСЫВАЙТЕСЬ НА МОЙ ТЕЛЕГРАМ-КАНАЛ О МАРКЕТИНГЕ И ИИ:</span>
          </div>
          <a 
            href="https://t.me/ParfunA" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-1 hover:underline underline-offset-4"
          >
            «Полезный Парфун» (25K+) <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="py-16 md:py-24 border-b-2 border-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/manus-storage/hero_bg_pattern_02f78b53.png')" }}></div>
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-white border border-black px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-[#0038FF] inline-block animate-pulse"></span>
              СТРАТЕГИЯ • ИИ-ИНТЕГРАЦИЯ • МАРЖИНАЛЬНОСТЬ
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6 font-display max-w-[85vw] sm:max-w-none">
              ВАШ ПРОВОДНИК <br />
              В ЭПОХУ <span className="bg-[#0038FF] text-white px-3 inline-block transform -rotate-1 py-1">ИИ</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#1A1A1A]/80 font-medium max-w-2xl leading-relaxed">
              Внедрение нейросетей имеет смысл только тогда, когда это увеличивает маржинальность бизнеса. Помогаю собственникам перестраивать процессы, исключать рутину и находить скрытую прибыль с помощью кастомных ИИ-систем.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#contact" 
                className="punk-btn-primary text-center w-full sm:w-auto"
                onClick={() => {
                  // Track click on "Записаться на аудит"
                  if (typeof window !== 'undefined') {
                    if ((window as any).ym) (window as any).ym(99958146, 'reachGoal', 'click_audit_hero');
                    if ((window as any).dataLayer) (window as any).dataLayer.push({ event: 'click_audit_hero' });
                  }
                }}
              >
                Записаться на аудит <ChevronRight className="h-4 w-4" />
              </a>
              <a 
                href="https://disk.yandex.ru/d/079p1TBOuc_N4w" 
                target="_blank"
                rel="noreferrer"
                className="punk-btn text-center w-full sm:w-auto"
                onClick={() => {
                  // Track click on "Скачать медиакит"
                  if (typeof window !== 'undefined') {
                    if ((window as any).ym) (window as any).ym(99958146, 'reachGoal', 'download_mediakit');
                    if ((window as any).dataLayer) (window as any).dataLayer.push({ event: 'download_mediakit' });
                  }
                }}
              >
                Скачать медиакит <Download className="h-4 w-4" />
              </a>
            </div>

            {/* Solid Metrics - MOBILE FIX: Stack on mobile, grid on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#1A1A1A]/20">
              <div className="space-y-1 border-b border-[#1A1A1A]/10 pb-4 sm:pb-0 sm:border-b-0">
                <div className="text-3xl md:text-4xl font-black text-[#0038FF] font-display">20 лет</div>
                <div className="text-xs font-bold text-[#1A1A1A]/60 uppercase tracking-wider">В МЕДИА И БИЗНЕСЕ</div>
              </div>
              <div className="space-y-1 border-b border-[#1A1A1A]/10 pb-4 sm:pb-0 sm:border-b-0">
                <div className="text-3xl md:text-4xl font-black text-[#0038FF] font-display">ТОП-1000</div>
                <div className="text-xs font-bold text-[#1A1A1A]/60 uppercase tracking-wider">МЕНЕДЖЕРОВ РФ</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-black text-[#0038FF] font-display">х3-х10</div>
                <div className="text-xs font-bold text-[#1A1A1A]/60 uppercase tracking-wider">УСКОРЕНИЕ ПРОЦЕССОВ</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Portrait Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative border-4 border-black bg-white p-4 punk-shadow-blue max-w-md w-full">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663030485714/LtkIxgeLKhfSSbuf.webp" 
                alt="Алексей Парфун" 
                className="w-full aspect-square object-cover border-2 border-black grayscale contrast-125"
              />
              <div className="mt-4 pt-4 border-t-2 border-black flex items-center justify-between">
                <div>
                  <h3 className="font-black text-lg font-display">АЛЕКСЕЙ ПАРФУН</h3>
                  <p className="text-xs font-bold text-[#1A1A1A]/60 uppercase tracking-wider">ARCHITECT OF AI TRANSFORMATION</p>
                </div>
                <span className="font-mono text-xs font-bold text-[#0038FF] bg-[#0038FF]/10 px-2 py-1">
                  v2.0.26
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SHADOW AI / PROBLEM SECTION */}
      <section className="py-16 bg-[#1A1A1A] text-white border-b-2 border-black relative overflow-hidden">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInScroll}
            className="max-w-3xl space-y-6 mb-12"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#0038FF] bg-white px-2 py-0.5">
              ПРОБЛЕМА: ТЕНЕВОЙ ИИ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-none font-display max-w-[85vw] sm:max-w-none">
              КАЖДЫЙ ПЯТЫЙ СКРЫВАЕТ ИСПОЛЬЗОВАНИЕ ИИ
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Сотрудники тайно используют генеративные сети, чтобы сдавать работу быстрее, но бизнес не получает от этого системного роста. Результат — риски утечки данных, хаос в процессах и нулевой прирост капитализации.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            
            <motion.div variants={itemFadeIn} className="border-2 border-white/20 p-6 space-y-4 bg-white/5 hover:border-[#0038FF] transition-colors">
              <div className="text-3xl font-black text-[#0038FF] font-display">01</div>
              <h3 className="text-lg font-bold uppercase">Утечка данных</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Сотрудники загружают конфиденциальные договоры, базы клиентов и финансовые отчеты в публичные нейросети для анализа.
              </p>
            </motion.div>

            <motion.div variants={itemFadeIn} className="border-2 border-white/20 p-6 space-y-4 bg-white/5 hover:border-[#0038FF] transition-colors">
              <div className="text-3xl font-black text-[#0038FF] font-display">02</div>
              <h3 className="text-lg font-bold uppercase">Имитация работы</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                ИИ делает задачу за 5 минут, сотрудник сдает её через 2 дня. Разница во времени сливается на прокрастинацию, а не на пользу бизнесу.
              </p>
            </motion.div>

            <motion.div variants={itemFadeIn} className="border-2 border-white/20 p-6 space-y-4 bg-white/5 hover:border-[#0038FF] transition-colors">
              <div className="text-3xl font-black text-[#0038FF] font-display">03</div>
              <h3 className="text-lg font-bold uppercase">Отсутствие системы</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Вместо автоматизации цепочек задач происходят точечные улучшения. Бизнес-процесс остается старым и неэффективным.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="py-20 border-b-2 border-[#1A1A1A] bg-white overflow-hidden">
        <div className="container">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInScroll}
            className="space-y-4 mb-12"
          >
            <span className="text-xs font-black uppercase tracking-widest text-white bg-[#0038FF] px-2 py-0.5">
              ОБО МНЕ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-none font-display max-w-[85vw] sm:max-w-none">
              РОССИЙСКИЙ ПРЕДПРИНИМАТЕЛЬ И МЕДИА-МЕНЕДЖЕР
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Artistic Manifesto Text */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInScroll}
              className="lg:col-span-7 space-y-6 text-base md:text-lg text-[#1A1A1A]/90 leading-relaxed"
            >
              <p className="font-semibold text-[#0038FF] text-lg md:text-xl border-l-4 border-[#0038FF] pl-4">
                Специализируюсь на маркетинговых коммуникациях и технологиях искусственного интеллекта. Руковожу технологическими проектами, сфокусированными на разработке и внедрении AI-решений в медиа-индустрию.
              </p>
              <p>
                Осуществляю консультационную поддержку для ведущих российских медиа-холдингов, включая <strong>Первый канал</strong>. Принимаю активное участие в развитии рекламной отрасли в качестве вице-президента Ассоциации коммуникационных агентств России (<strong>АКАР</strong>), где также являюсь сопредседателем комитета по искусственному интеллекту.
              </p>
              <p>
                Занимаюсь научной, исследовательской и образовательной деятельностью, выступая в качестве приглашенного спикера в ведущих вузах страны, включая <strong>МГИМО, ВШЭ и РАНХиГС</strong>. Являюсь основателем ряда технологических стартапов, в том числе первого в России full-AI агентства <strong>AI Influence</strong>.
              </p>
            </motion.div>

            {/* Right Column: Solid Achievements Cards */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="lg:col-span-5 space-y-4"
            >
              
              <motion.div variants={itemFadeIn} className="border-2 border-[#1A1A1A] p-5 bg-[#F5F2EB]/50 flex gap-4 items-start">
                <Trophy className="h-6 w-6 text-[#0038FF] shrink-0 mt-1" />
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tight">Медиа-менеджер России 2020</h4>
                  <p className="text-xs text-[#1A1A1A]/70 mt-1">Награжден за выдающийся личный вклад в развитие рекламной и медиа-индустрии страны.</p>
                </div>
              </motion.div>

              <motion.div variants={itemFadeIn} className="border-2 border-[#1A1A1A] p-5 bg-white flex gap-4 items-start">
                <Award className="h-6 w-6 text-[#0038FF] shrink-0 mt-1" />
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tight">Лауреат ТОП-1000 менеджеров</h4>
                  <p className="text-xs text-[#1A1A1A]/70 mt-1">Включен в авторитетный рейтинг ИД «Коммерсантъ» три года подряд: 2023, 2024, 2025.</p>
                </div>
              </motion.div>

              <motion.div variants={itemFadeIn} className="border-2 border-[#1A1A1A] p-5 bg-[#F5F2EB]/50 flex gap-4 items-start">
                <Send className="h-6 w-6 text-[#0038FF] shrink-0 mt-1" />
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tight">«Полезный Парфун» (25 000+)</h4>
                  <p className="text-xs text-[#1A1A1A]/70 mt-1">Признан лучшим Telegram-каналом о маркетинге 2024 года по версии TgScore. Общий охват в медиа — 40K+.</p>
                </div>
              </motion.div>

            </motion.div>

          </div>

          {/* Timeline / Additional Background Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t-2 border-[#1A1A1A]/10"
          >
            
            <motion.div variants={itemFadeIn} className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#0038FF] bg-[#0038FF]/10 px-2 py-0.5">УПРАВЛЕНЧЕСКИЙ ОПЫТ</span>
              <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">
                Создатель и директор АКАР Урал (2017-2020), генеральный директор <strong>СТС Media Екатеринбург</strong> (2014-2017), директор по развитию рекламной группы <strong>Deltaplan</strong> (топ-10 РФ, 2017-2022).
              </p>
            </motion.div>

            <motion.div variants={itemFadeIn} className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#0038FF] bg-[#0038FF]/10 px-2 py-0.5">ОТРАСЛЕВАЯ ЭКСПЕРТИЗА</span>
              <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">
                Член жюри престижных фестивалей: <strong>E+ (Effie Russia)</strong>, Red Apple, Серебряный Меркурий, Национальная премия бизнес-коммуникаций, Серебряный лучник.
              </p>
            </motion.div>

            <motion.div variants={itemFadeIn} className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#0038FF] bg-[#0038FF]/10 px-2 py-0.5">НАУКА И ОБРАЗОВАНИЕ</span>
              <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">
                Приглашенный спикер МГИМО, ВШЭ, РАНХиГС, МГТУ, Сенеж, Мастерская новых медиа. Автор более 300 публикаций в СМИ, включая <strong>Forbes, Коммерсантъ, РБК, Sostav, Adindex</strong>.
              </p>
            </motion.div>

          </motion.div>

          {/* Historic Milestones Grid - MOBILE FIX: 1 col on mobile, 2 on sm, 4 on md */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#1A1A1A]/10"
          >
            <motion.div variants={itemFadeIn} className="border border-[#1A1A1A]/20 p-4 bg-white/50">
              <span className="text-xs text-[#1A1A1A]/50 block">2010-2013</span>
              <span className="font-bold text-xs uppercase block mt-1">Школа Блогеров 1-4</span>
              <span className="text-[11px] text-[#1A1A1A]/70 block mt-1">Создатель и организатор</span>
            </motion.div>
            <motion.div variants={itemFadeIn} className="border border-[#1A1A1A]/20 p-4 bg-white/50">
              <span className="text-xs text-[#1A1A1A]/50 block">2010-2012</span>
              <span className="font-bold text-xs uppercase block mt-1">Фестиваль ПОРА</span>
              <span className="text-[11px] text-[#1A1A1A]/70 block mt-1">Digital-директор фестиваля</span>
            </motion.div>
            <motion.div variants={itemFadeIn} className="border border-[#1A1A1A]/20 p-4 bg-white/50">
              <span className="text-xs text-[#1A1A1A]/50 block">2015</span>
              <span className="font-bold text-xs uppercase block mt-1">АКАР УРАЛ</span>
              <span className="text-[11px] text-[#1A1A1A]/70 block mt-1">Создатель и первый идеолог</span>
            </motion.div>
            <motion.div variants={itemFadeIn} className="border border-[#1A1A1A]/20 p-4 bg-white/50">
              <span className="text-xs text-[#1A1A1A]/50 block">2019</span>
              <span className="font-bold text-xs uppercase block mt-1">STARTUP REALITY</span>
              <span className="text-[11px] text-[#1A1A1A]/70 block mt-1">Член жюри 1 сезона ТВ-шоу</span>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 bg-[#F5F2EB] border-b-2 border-[#1A1A1A] overflow-hidden">
        <div className="container">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInScroll}
            className="max-w-3xl space-y-6 mb-16"
          >
            <span className="text-xs font-black uppercase tracking-widest text-white bg-[#0038FF] px-2 py-0.5">
              ПРОДУКТЫ И УСЛУГИ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-none font-display max-w-[85vw] sm:max-w-none">
              ТРИ ФОРМАТА СОТРУДНИЧЕСТВА
            </h2>
            <p className="text-lg text-[#1A1A1A]/80 leading-relaxed font-medium">
              Моя цель — системное внедрение искусственного интеллекта в операционную структуру вашего бизнеса для кратного роста маржинальности, устранения неэффективности в процессах и глубокой технологической трансформации вашей команды.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Service 1: Стратегическая сессия */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInScroll}
              className="border-4 border-black bg-white p-8 punk-shadow-blue flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-black uppercase tracking-wider bg-[#0038FF] text-white px-2 py-0.5">ФОКУС-ДЕНЬ</span>
                  <span className="font-mono text-xs font-bold text-[#1A1A1A]/60">01 / СТРАТЕГИЯ</span>
                </div>
                <h3 className="text-2xl font-black uppercase font-display leading-tight">Стратегическая сессия</h3>
                <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                  Погружение в ваш бизнес для поиска точек роста маржинальности через ИИ. Разбираем процессы, находим рутину и проектируем ИИ-архитектуру.
                </p>
                <ul className="space-y-3 text-sm font-bold pt-4 border-t border-[#1A1A1A]/10">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#0038FF] shrink-0 mt-0.5" /> Аудит текущих бизнес-процессов компании
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#0038FF] shrink-0 mt-0.5" /> Поиск скрытых потерь времени и денег
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#0038FF] shrink-0 mt-0.5" /> Дорожная карта внедрения ИИ на 3–6 месяцев
                  </li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t-2 border-black flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#1A1A1A]/50 uppercase block">Стоимость</span>
                  <span className="text-xl font-black font-display text-[#0038FF]">от 500 000 ₽</span>
                </div>
                <a href="#contact" className="bg-[#1A1A1A] text-white p-3 border border-black hover:bg-[#0038FF] transition-colors">
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

            {/* Service 2: ИИ-Акселератор */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInScroll}
              className="border-4 border-black bg-white p-8 punk-shadow-blue flex flex-col justify-between relative"
            >
              <div className="absolute -top-3.5 right-6 bg-[#0038FF] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 border-2 border-black">
                ПОПУЛЯРНО
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-black uppercase tracking-wider bg-[#0038FF] text-white px-2 py-0.5">3 МЕСЯЦА</span>
                  <span className="font-mono text-xs font-bold text-[#1A1A1A]/60">02 / ВНЕДРЕНИЕ</span>
                </div>
                <h3 className="text-2xl font-black uppercase font-display leading-tight">ИИ-Акселератор</h3>
                <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                  Полноценная трансформация работы вашей команды. Разработка плана обучения, мотивации сотрудников и плотное сопровождение на всех этапах.
                </p>
                <ul className="space-y-3 text-sm font-bold pt-4 border-t border-[#1A1A1A]/10">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#0038FF] shrink-0 mt-0.5" /> Разработка кастомных планов обучения под отделы
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#0038FF] shrink-0 mt-0.5" /> Создание системы мотивации за ИИ-эффективность
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#0038FF] shrink-0 mt-0.5" /> Еженедельное сопровождение и аудит прогресса
                  </li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t-2 border-black flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#1A1A1A]/50 uppercase block">Стоимость</span>
                  <span className="text-xl font-black font-display text-[#0038FF]">от 1 500 000 ₽</span>
                </div>
                <a href="#contact" className="bg-[#1A1A1A] text-white p-3 border border-black hover:bg-[#0038FF] transition-colors">
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

            {/* Service 3: Личный Advisory */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInScroll}
              className="border-4 border-black bg-white p-8 punk-shadow-blue flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-black uppercase tracking-wider bg-[#0038FF] text-white px-2 py-0.5">РЕТЕЙНЕР</span>
                  <span className="font-mono text-xs font-bold text-[#1A1A1A]/60">03 / СОВЕТНИК</span>
                </div>
                <h3 className="text-2xl font-black uppercase font-display leading-tight">Личный Advisory</h3>
                <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                  Регулярное сопровождение собственника и топ-менеджмента. Помогаю принимать сложные решения, оценивать ИИ-подрядчиков и держать фокус на маржинальности.
                </p>
                <ul className="space-y-3 text-sm font-bold pt-4 border-t border-[#1A1A1A]/10">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#0038FF] shrink-0 mt-0.5" /> 2 личные сессии в месяц с собственником
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#0038FF] shrink-0 mt-0.5" /> Постоянный доступ в Telegram для консультаций
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#0038FF] shrink-0 mt-0.5" /> Независимый аудит сторонних ИИ-решений и подрядчиков
                  </li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t-2 border-black flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#1A1A1A]/50 uppercase block">Стоимость</span>
                  <span className="text-xl font-black font-display text-[#0038FF]">от 300 000 ₽ / мес</span>
                </div>
                <a href="#contact" className="bg-[#1A1A1A] text-white p-3 border border-black hover:bg-[#0038FF] transition-colors">
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* METHODOLOGY SECTION - MOBILE FIX: 1 col on mobile, grid on md */}
      <section id="methodology" className="py-20 bg-[#1A1A1A] text-white border-b-2 border-black overflow-hidden">
        <div className="container">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInScroll}
            className="max-w-3xl space-y-6 mb-16"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#0038FF] bg-white px-2 py-0.5">
              МЕТОДОЛОГИЯ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-none font-display max-w-[85vw] sm:max-w-none">
              МОДЕЛЬ 4М: СИСТЕМНЫЙ РОСТ
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Внедрение ИИ — это не установка софта. Это глубокая трансформация, которая затрагивает маржинальность, мышление команды, медиа-присутствие компании и операционные регламенты.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInScroll}
              className="border-2 border-white/20 p-6 space-y-4 bg-white/5 hover:border-[#0038FF] transition-colors"
            >
              <div className="text-3xl font-black text-[#0038FF] font-display">01</div>
              <h3 className="text-lg font-bold uppercase tracking-tight">Margin (Маржа)</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Любое ИИ-внедрение должно окупаться. Сначала мы считаем экономический эффект: сколько часов рутины мы сокращаем и сколько чистой прибыли высвобождаем.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInScroll}
              className="border-2 border-white/20 p-6 space-y-4 bg-white/5 hover:border-[#0038FF] transition-colors"
            >
              <div className="text-3xl font-black text-[#0038FF] font-display">02</div>
              <h3 className="text-lg font-bold uppercase tracking-tight">Mindset (Мышление)</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Снимаем страх увольнения у сотрудников. Учим их делегировать ИИ рутинную работу и переходить на уровень постановщиков задач и контролеров качества.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInScroll}
              className="border-2 border-white/20 p-6 space-y-4 bg-white/5 hover:border-[#0038FF] transition-colors"
            >
              <div className="text-3xl font-black text-[#0038FF] font-display">03</div>
              <h3 className="text-lg font-bold uppercase tracking-tight">Media (Медиа)</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Используем ИИ для масштабирования вашего влияния. Автоматизируем дистрибуцию смыслов, создание контента и выстраивание сильного личного бренда.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInScroll}
              className="border-2 border-white/20 p-6 space-y-4 bg-white/5 hover:border-[#0038FF] transition-colors"
            >
              <div className="text-3xl font-black text-[#0038FF] font-display">04</div>
              <h3 className="text-lg font-bold uppercase tracking-tight">Management (Менеджмент)</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Закрепляем результат в регламентах. Описываем новые цепочки задач, внедряем ИИ-агентов в ежедневный воркфлоу и создаем базу знаний компании.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SPEAKING TOPICS SECTION */}
      <section id="speaking" className="py-20 bg-white border-b-2 border-[#1A1A1A] overflow-hidden">
        <div className="container">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 items-end">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInScroll}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-xs font-black uppercase tracking-widest text-white bg-[#0038FF] px-2 py-0.5">
                ВЫСТУПЛЕНИЯ И ЛЕКЦИИ
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-none font-display max-w-[85vw] sm:max-w-none">
                ТЕМЫ И СЕМИНАРЫ ДЛЯ ВАШИХ МЕРОПРИЯТИЙ
              </h2>
              <p className="text-lg text-[#1A1A1A]/80 leading-relaxed">
                Более 450 успешных выступлений по всей России. Я гибко адаптирую программу под задачи вашего форума, конференции или корпоративного тренинга.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInScroll}
              className="lg:col-span-5 flex flex-wrap gap-2 lg:justify-end"
            >
              <button 
                onClick={() => setActiveTopicCategory("ai")}
                className={`text-xs font-black uppercase tracking-wider px-4 py-2 border-2 border-black transition-all ${activeTopicCategory === "ai" ? "bg-[#0038FF] text-white punk-shadow-sm" : "bg-white text-black hover:bg-[#F5F2EB]"}`}
              >
                Искусственный Интеллект
              </button>
              <button 
                onClick={() => setActiveTopicCategory("marketing")}
                className={`text-xs font-black uppercase tracking-wider px-4 py-2 border-2 border-black transition-all ${activeTopicCategory === "marketing" ? "bg-[#0038FF] text-white punk-shadow-sm" : "bg-white text-black hover:bg-[#F5F2EB]"}`}
              >
                Маркетинг и PR
              </button>
              <button 
                onClick={() => setActiveTopicCategory("personal_brand")}
                className={`text-xs font-black uppercase tracking-wider px-4 py-2 border-2 border-black transition-all ${activeTopicCategory === "personal_brand" ? "bg-[#0038FF] text-white punk-shadow-sm" : "bg-white text-black hover:bg-[#F5F2EB]"}`}
              >
                Личный Бренд
              </button>
              <button 
                onClick={() => setActiveTopicCategory("media")}
                className={`text-xs font-black uppercase tracking-wider px-4 py-2 border-2 border-black transition-all ${activeTopicCategory === "media" ? "bg-[#0038FF] text-white punk-shadow-sm" : "bg-white text-black hover:bg-[#F5F2EB]"}`}
              >
                Новые Медиа
              </button>
            </motion.div>
          </div>

          {/* Topics Grid - MOBILE FIX: 1 col on mobile, grid on md */}
          <motion.div 
            key={activeTopicCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {speakingTopics[activeTopicCategory as keyof typeof speakingTopics].map((topic, idx) => (
              <div key={idx} className="border-2 border-black p-6 bg-[#F5F2EB]/30 hover:bg-white hover:punk-shadow-blue transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-2 w-12 bg-[#0038FF]"></div>
                  <h3 className="text-xl font-black uppercase font-display leading-tight">{topic.title}</h3>
                  <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">{topic.desc}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60">
                  <span>Доклад / Интерактив</span>
                  <a href="#contact" className="text-[#0038FF] hover:underline flex items-center gap-1">Обсудить формат <ArrowUpRight className="h-3 w-3" /></a>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Flexible Adaptation Notice */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInScroll}
            className="mt-8 border-2 border-black p-6 bg-[#0038FF]/5 flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-[#0038FF] shrink-0" />
              <p className="text-sm font-bold text-[#1A1A1A]/80 leading-relaxed">
                Нужна кастомная тема под специфику вашей отрасли или закрытого клуба? Мы можем детально проработать программу выступления под ваш запрос.
              </p>
            </div>
            <a href="#contact" className="text-xs font-black uppercase tracking-wider bg-[#1A1A1A] text-white px-4 py-2 hover:bg-[#0038FF] transition-colors shrink-0 w-full md:w-auto text-center mt-4 md:mt-0">
              Кастомная программа
            </a>
          </motion.div>

        </div>
      </section>

      {/* TELEGRAM CHANNEL / BLOG SECTION */}
      <section id="blog" className="py-20 bg-[#F5F2EB] border-b-2 border-[#1A1A1A] overflow-hidden">
        <div className="container">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInScroll}
              className="max-w-2xl space-y-6"
            >
              <span className="text-xs font-black uppercase tracking-widest text-white bg-[#0038FF] px-2 py-0.5">
                ПОЛЕЗНЫЙ ПАРФУН
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-none font-display max-w-[85vw] sm:max-w-none">
                СВЕЖИЕ МЫСЛИ ИЗ ТЕЛЕГРАМ-КАНАЛА
              </h2>
              <p className="text-lg text-[#1A1A1A]/80 leading-relaxed">
                Пишу без зауми, ИИ-штампов и воды. Только практический опыт, жесткий маркетинг и честный разбор кейсов внедрения искусственного интеллекта.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInScroll}
              className="shrink-0 w-full md:w-auto"
            >
              <a 
                href="https://t.me/ParfunA" 
                target="_blank" 
                rel="noreferrer" 
                className="punk-btn-primary w-full md:w-auto text-center"
              >
                Подписаться на канал (25K+) <Send className="h-4 w-4 fill-current" />
              </a>
            </motion.div>
          </div>

          {/* Posts Grid - MOBILE FIX: 1 col on mobile, grid on md */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {tgPosts.slice(0, visibleTgPostsCount).map((post) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="border-4 border-black bg-white p-6 punk-shadow flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold text-[#1A1A1A]/50">
                      <span>{post.date}</span>
                      <span>@ParfunA</span>
                    </div>
                    <h3 className="text-lg font-black uppercase leading-tight font-display hover:text-[#0038FF] transition-colors line-clamp-2">
                      <a href={post.link} target="_blank" rel="noreferrer">{post.title}</a>
                    </h3>
                    <p className="text-sm text-[#1A1A1A]/70 leading-relaxed line-clamp-6">
                      {post.text}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A1A1A]/50 flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {post.views}
                    </span>
                    <a 
                      href={post.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-xs font-black uppercase tracking-wider text-[#0038FF] hover:underline flex items-center gap-1"
                    >
                      Читать пост <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Show More Button */}
          {tgPosts.length > visibleTgPostsCount && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisibleTgPostsCount(prev => Math.min(prev + 3, tgPosts.length))}
                className="punk-btn border-4 border-black bg-white text-[#1A1A1A] hover:bg-[#0038FF] hover:text-white px-8 py-3 font-black uppercase tracking-wider transition-all duration-200"
              >
                Показать еще посты
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section id="contact" className="py-20 bg-white overflow-hidden">
        <div className="container max-w-4xl">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInScroll}
            className="text-right flex flex-col items-end space-y-6 mb-12"
          >
            <span className="text-xs font-black uppercase tracking-widest text-white bg-[#0038FF] px-2 py-0.5">
              СВЯЗАТЬСЯ СО МНОЙ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-none font-display max-w-[85vw] sm:max-w-none">
              ОБСУДИТЬ ПРОЕКТ ИЛИ ВЫСТУПЛЕНИЕ
            </h2>
            <p className="text-base md:text-lg text-[#1A1A1A]/70 max-w-2xl text-right">
              Никаких длинных опросников и сложных форм. Самый быстрый путь к результату — это прямой, конструктивный диалог. Напишите мне в Telegram или на почту.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInScroll}
            className="border-4 border-black p-8 md:p-12 bg-[#F5F2EB]/30 punk-shadow-blue flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch"
          >
            <a 
              href="https://t.me/AVParfun" 
              target="_blank" 
              rel="noreferrer" 
              className="flex-1 border-4 border-black bg-[#0038FF] text-white p-6 md:p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors duration-200 group relative overflow-hidden active:scale-[0.98] punk-shadow"
              onClick={() => {
                // Track click on "Написать в Telegram"
                if (typeof window !== 'undefined') {
                  if ((window as any).ym) (window as any).ym(99958146, 'reachGoal', 'contact_telegram');
                  if ((window as any).dataLayer) (window as any).dataLayer.push({ event: 'contact_telegram' });
                }
              }}
            >
              <div className="space-y-4 relative z-10">
                <span className="text-xs font-black uppercase tracking-widest bg-white text-black px-2 py-0.5 inline-block">
                  TELEGRAM
                </span>
                <h3 className="text-2xl md:text-3xl font-black font-display leading-tight">
                  НАПИСАТЬ В TELEGRAM
                </h3>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Прямая связь со мной. Обсуждение ИИ-акселерации, стратегических сессий или личного консалтинга без посредников.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-8 font-black uppercase text-xs tracking-widest relative z-10">
                <span>ОТКРЫТЬ ЧАТ @AVParfun</span>
                <Send className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              {/* Background accent block */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            </a>

            <a 
              href="mailto:aparfun@gmail.com" 
              className="flex-1 border-4 border-black bg-white text-black p-6 md:p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors duration-200 group relative overflow-hidden active:scale-[0.98] punk-shadow"
              onClick={() => {
                // Track click on "Отправить на почту"
                if (typeof window !== 'undefined') {
                  if ((window as any).ym) (window as any).ym(99958146, 'reachGoal', 'contact_email');
                  if ((window as any).dataLayer) (window as any).dataLayer.push({ event: 'contact_email' });
                }
              }}
            >
              <div className="space-y-4 relative z-10">
                <span className="text-xs font-black uppercase tracking-widest bg-[#0038FF] text-white px-2 py-0.5 inline-block">
                  EMAIL
                </span>
                <h3 className="text-2xl md:text-3xl font-black font-display leading-tight">
                  ОТПРАВИТЬ НА ПОЧТУ
                </h3>
                <p className="text-xs md:text-sm text-black/60 group-hover:text-white/80 leading-relaxed">
                  Официальные запросы на участие в конференциях, лекциях, жюри фестивалей или долгосрочные коммерческие предложения.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-8 font-black uppercase text-xs tracking-widest relative z-10">
                <span>aparfun@gmail.com</span>
                <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              {/* Background accent block */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0038FF]/5 rounded-full blur-2xl pointer-events-none" />
            </a>
          </motion.div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] text-white py-12 border-t-4 border-black">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 md:col-span-2">
            <span className="font-black text-xl tracking-tight font-display bg-[#0038FF] text-white px-2.5 py-0.5 inline-block">
              ПАРФУН
            </span>
            <p className="text-xs text-white/50 max-w-sm leading-relaxed">
              Алексей Парфун — Архитектор ИИ-трансформации бизнеса. Помогаю собственникам выстраивать прагматичные, кастомные ИИ-системы для роста чистой прибыли и маржинальности.
            </p>
            <div className="text-[10px] text-white/40 pt-2 space-y-1">
              <div>ИП Парфун Алексей Владимирович</div>
              <div>ОГРНИП: 317554300092510</div>
              <div>ИНН: 552002932103</div>
              <div className="text-[9px] text-white/30 pt-1">Адрес: Москва, ул Сходненская 12к1, кв 1</div>
              <div className="text-[9px] text-white/30 italic pt-1">Информация на сайте не является публичной офертой (ст. 437 ГК РФ).</div>
            </div>
          </div>

          <div className="space-y-3 text-xs uppercase font-bold tracking-wider">
            <h4 className="text-white/40">Разделы</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-[#0038FF] transition-colors">Обо мне</a></li>
              <li><a href="#services" className="hover:text-[#0038FF] transition-colors">Услуги</a></li>
              <li><a href="#methodology" className="hover:text-[#0038FF] transition-colors">Методология</a></li>
              <li><a href="#speaking" className="hover:text-[#0038FF] transition-colors">Выступления</a></li>
              <li><a href="#blog" className="hover:text-[#0038FF] transition-colors">Блог</a></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs uppercase font-bold tracking-wider">
            <h4 className="text-white/40">Связь и Контакты</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://t.me/AVParfun" target="_blank" rel="noreferrer" className="hover:text-[#0038FF] transition-colors flex items-center gap-1">
                  Личный Telegram @AVParfun <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://t.me/ParfunA" target="_blank" rel="noreferrer" className="hover:text-[#0038FF] transition-colors flex items-center gap-1">
                  Telegram-канал <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="hover:text-[#0038FF] text-left transition-colors block"
                >
                  Политика конфиденциальности
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="container mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} АЛЕКСЕЙ ПАРФУН. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</span>
          <span className="mt-2 sm:mt-0">САЙТ СООТВЕТСТВУЕТ ФЗ-152 РФ О ПЕРСОНАЛЬНЫХ ДАННЫХ</span>
        </div>
      </footer>

      {/* COOKIE CONSENT BANNER */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-40 bg-white border-4 border-black p-6 punk-shadow-blue flex flex-col gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#0038FF] text-white text-[10px] font-black uppercase px-1.5 py-0.5">COOKIE</span>
                <h4 className="font-black text-xs uppercase tracking-wider">МЫ ИСПОЛЬЗУЕМ COOKIE</h4>
              </div>
              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed">
                Для анализа трафика и улучшения сайта мы используем Яндекс.Метрику и Google Tag Manager. Оставаясь на сайте, вы соглашаетесь с обработкой файлов cookie в соответствии с нашей{" "}
                <button
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="underline font-bold hover:text-[#0038FF] transition-colors inline-block"
                >
                  Политикой конфиденциальности
                </button>
                .
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAcceptCookies}
                className="punk-btn-primary text-xs py-1.5 px-4 font-black uppercase tracking-wider"
              >
                ПРИНЯТЬ И ПРОДОЛЖИТЬ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRIVACY POLICY MODAL (ФЗ-152 Compliance) */}
      <AnimatePresence>
        {showPrivacyPolicy && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white border-4 border-black max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 md:p-8 punk-shadow-blue relative"
            >
              <button 
                onClick={() => setShowPrivacyPolicy(false)}
                className="absolute top-4 right-4 p-2 border-2 border-black bg-white hover:bg-[#0038FF] hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-6 text-[#1A1A1A] text-sm leading-relaxed">
                <h3 className="text-xl font-black font-display border-b-2 border-black pb-2">
                  Политика конфиденциальности
                </h3>
                
                <p className="font-bold">
                  Соблюдение Федерального закона РФ № 152-ФЗ «О персональных данных»
                </p>

                <div className="space-y-4 text-xs md:text-sm text-[#1A1A1A]/80">
                  <p>
                    Настоящая Политика определяет порядок обработки и защиты персональных данных пользователей сайта parfun.ru, обрабатываемых ИП Парфун Алексей Владимирович (ИНН: 552002932103, ОГРНИП: 317554300092510).
                  </p>
                  
                  <h4 className="font-bold text-[#1A1A1A] uppercase">1. Какие данные обрабатываются</h4>
                  <p>
                    Сайт не собирает ваши персональные данные через встроенные формы ввода. При клике на кнопки прямой связи вы переходите в сторонние приложения (Telegram или почтовый клиент), где общение происходит напрямую. Дополнительно сайт использует метрические системы Яндекс.Метрика и Google Tag Manager для сбора анонимных статистических данных (файлы cookie, IP-адрес, действия на сайте) с целью улучшения UX.
                  </p>

                  <h4 className="font-bold text-[#1A1A1A] uppercase">2. Цель обработки данных</h4>
                  <p>
                    Анонимные метрические данные обрабатываются исключительно в целях веб-аналитики, оценки эффективности рекламных каналов, отслеживания кликов по кнопкам связи и скачивания медиакита для оптимизации работы сайта.
                  </p>

                  <h4 className="font-bold text-[#1A1A1A] uppercase">3. Безопасность и передача данных</h4>
                  <p>
                    Мы не собираем, не храним на серверах сайта и не передаем ваши личные персональные данные третьим лицам. Прямое общение в Telegram с Алексеем Парфуном (@AVParfun) защищено внутренними протоколами сквозного шифрования Telegram Messenger.
                  </p>

                  <h4 className="font-bold text-[#1A1A1A] uppercase">4. Права пользователя</h4>
                  <p>
                    Вы можете ограничить сбор файлов cookie в настройках своего браузера. Для удаления ваших контактных данных, переданных в ходе личной переписки, вы можете обратиться напрямую к Алексею Парфуну в Telegram (@AVParfun).
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10 flex justify-end">
                  <button 
                    onClick={() => setShowPrivacyPolicy(false)}
                    className="punk-btn-primary"
                  >
                    Понятно, закрыть
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
