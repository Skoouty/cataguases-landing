import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FormField from '../components/FormField';

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  apelido: z.string().min(1, 'Apelido é obrigatório'),
  telefone: z.string().min(14, 'Telefone inválido'),
  email: z.union([z.literal(''), z.string().email('E-mail inválido')]),
  cep: z.string().length(9, 'CEP incompleto'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  referencia: z.string().min(1, 'Referência é obrigatória'),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  cidade: z.string(),
  estado: z.string()
});

export default function LandingPageCataguases() {
  const items = [
    '1 Furadeira/Parafusadeira 21V',
    '2 baterias de lítio 21V',
    '1 carregador bivolt automático',
    '6 bits de chave de fenda',
    '6 brocas',
    '10 mangas/soquetes',
    '1 tubo de extensão',
    '1 manual do produto',
    '1 caixa de ferramentas',
  ];

  const specs = [
    ['Bateria', '21V (6500mAh)'],
    ['Tipo de bateria', 'Íon de lítio'],
    ['Carregador', '110V / 220V bivolt automático'],
    ['Velocidade', '0-1500 RPM'],
    ['Torque máximo', '120 Nm'],
    ['Funções', 'Martelo, Furação e Parafusagem'],
    ['Sistema reverso', 'Sim'],
    ['Luz LED', 'Sim'],
    ['Ajuste de torque', '25 níveis'],
  ];


  const gallery = [
    "/images/br-11134207-81ztc-mjxyakdpo6ip03@resize_w450_nl.webp",
    "/images/br-11134207-81ztc-mjxyakdp8q9t15.webp",
    "/images/br-11134207-81ztc-mjxyakdioqva10.webp",
    "/images/br-11134207-81ztc-mjxyakdfkdfnd5.webp",
    "/images/br-11134207-81z1k-mfnfribrjton56.webp",
    "/images/br-11134207-81z1k-mfnfribrif4758.webp",
    "/images/br-11134207-81z1k-mfnfribr9zpja0.webp",
    "/images/br-11134207-81z1k-mfnfribr8l5305.webp",
    "/images/br-11134207-81z1k-mfnfribr76kn36.webp",
  ];

  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const nextImage = () => {
    setActiveImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      cidade: 'Cataguases',
      estado: 'MG',
    }
  });

  const onSubmit = async (data) => {
    try {
      await fetch('https://n8n.leadapp.com.br/webhook/pedido-cataguases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.error('Erro ao enviar pedido:', e);
    }
    setIsSuccess(true);
  };

  const handlePhoneChange = (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length <= 10) {
      v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
      v = v.replace(/(\d)(\d{4})$/, '$1-$2');
    } else {
      v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
      v = v.replace(/(\d)(\d{5})$/, '$1-$2');
    }
    setValue('telefone', v.substring(0, 15), { shouldValidate: true });
  };

  const handleCepChange = (e) => {
    let v = e.target.value.replace(/\D/g, '');
    v = v.replace(/^(\d{5})(\d)/, '$1-$2');
    setValue('cep', v.substring(0, 9), { shouldValidate: true });
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-red-500/30">
      {/* Premium Announcement Bar */}
      <div className="relative flex overflow-hidden bg-gradient-to-r from-red-950 via-zinc-900 to-red-950 py-3 text-white shadow-lg border-b border-white/10">
        {/* Shine effect overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.08)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shine_5s_linear_infinite]" />

        {/* Marquee Container */}
        <div className="z-10 flex w-max animate-[marquee_35s_linear_infinite] items-center whitespace-nowrap text-sm font-bold tracking-wide sm:text-base">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-4">
              <span className="relative flex h-2.5 w-2.5 mr-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              </span>
              <span>📍 Cataguases - MG</span>
              <span className="mx-5 text-zinc-600">•</span>
              <span className="text-zinc-100">🚚 Frete grátis</span>
              <span className="mx-5 text-zinc-600">•</span>
              <span className="text-red-400">💰 Pague na entrega</span>
            </div>
          ))}
        </div>
      </div>

      <section className="relative mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-6">

          {/* 1. Title */}
          <div className="order-1 md:col-start-1 md:row-start-1 flex flex-col justify-center pt-2">
            <h1 className="text-[2.1rem] sm:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-950 leading-[1.15] drop-shadow-sm">
              Furadeira Parafusadeira Profissional <br className="hidden lg:block" />
              <span className="text-red-600">3 em 1</span> com Kit Completo
            </h1>
          </div>

          {/* 2. Main Image Gallery (Unified Card) */}
          <div className="order-2 w-full md:col-start-2 md:row-start-1 md:row-span-6">
            <div className="sticky top-6 md:top-8 perspective-1000">
              <div className="flex flex-col gap-4 rounded-[2rem] md:rounded-[2.5rem] bg-white p-3 md:p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-zinc-200">

                {/* Main Interactive Image */}
                <div
                  className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] group flex items-center justify-center select-none bg-zinc-50"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEndHandler}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-red-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>

                  {/* Previous Arrow */}
                  <button
                    onClick={prevImage}
                    className="absolute left-3 md:left-4 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-zinc-950/60 text-white backdrop-blur-md transition-all hover:bg-zinc-950/80 hover:scale-105 active:scale-95 shadow-lg border border-white/10"
                    aria-label="Imagem anterior"
                  >
                    <svg className="h-6 w-6 pr-0.5 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                  </button>

                  {/* Main Image with Transition */}
                  <div className="w-full aspect-square overflow-hidden relative">
                    {gallery.map((img, idx) => (
                      <img
                        key={img}
                        src={img}
                        alt={`Produto ${idx + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${idx === activeImage ? 'opacity-100 relative z-0' : 'opacity-0 z-[-1]'}`}
                      />
                    ))}
                  </div>

                  {/* Next Arrow */}
                  <button
                    onClick={nextImage}
                    className="absolute right-3 md:right-4 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-zinc-950/60 text-white backdrop-blur-md transition-all hover:bg-zinc-950/80 hover:scale-105 active:scale-95 shadow-lg border border-white/10"
                    aria-label="Próxima imagem"
                  >
                    <svg className="h-6 w-6 pl-0.5 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide px-1">
                  {gallery.map((src, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`relative flex-shrink-0 snap-start overflow-hidden rounded-[1.1rem] border-2 transition-all duration-300 ${activeImage === index ? 'border-red-500 shadow-[0_0_15px_-3px_rgba(239,68,68,0.5)] scale-100' : 'border-zinc-200 scale-95 opacity-60 hover:opacity-100 hover:border-zinc-300'
                        }`}
                    >
                      <img src={src} alt={`Miniatura ${index + 1}`} className="h-[4.5rem] w-[4.5rem] object-cover md:h-20 md:w-20" />
                    </button>
                  ))}
                </div>

                {/* Inside-Card Delivery Badge */}
                <div className="mb-1 mx-1 flex items-center justify-center gap-3 rounded-2xl bg-zinc-950 px-4 py-3.5 text-xs md:text-sm font-semibold tracking-wide text-zinc-100 shadow-md ring-1 ring-zinc-800 transition hover:ring-zinc-700">
                  <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                  </span>
                  Entrega rápida em Cataguases
                </div>
              </div>
            </div>
          </div>

          {/* 3. Offer Block */}
          {/* 3. Offer Block (High Conversion) */}
          <div className="order-3 md:col-start-1 md:row-start-2">
            <div className="rounded-[2rem] bg-white p-6 md:p-8 shadow-xl ring-1 ring-zinc-200">

              {/* Header: Rating & Exclusive Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex rounded-md bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
                  Oferta Exclusiva
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-600">
                  <span className="text-amber-500 text-sm">⭐</span> 4,6
                  <span className="text-zinc-300 mx-1">•</span>
                  <span className="text-zinc-500">689 vendidos</span>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="flex flex-col mb-4">
                <span className="text-sm font-bold text-zinc-400 line-through decoration-zinc-300 mb-1">
                  De R$ 249,99
                </span>

                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-red-600 uppercase tracking-widest mb-1.5">Hoje por apenas</span>
                  <div className="flex items-baseline text-zinc-950">
                    <span className="text-3xl font-black pr-1">R$</span>
                    <span className="text-[5.5rem] md:text-[6.5rem] font-black tracking-tighter leading-none">
                      169
                    </span>
                    <span className="text-3xl font-black">,99</span>
                  </div>
                </div>

                {/* Scarcity */}
                <div className="mt-4 flex items-center gap-2 text-red-600 font-bold text-sm bg-red-50 w-fit px-3 py-1.5 rounded-lg border border-red-100">
                  <span className="animate-pulse">🔥</span> Apenas 9 unidades disponíveis
                </div>
              </div>

              <hr className="border-zinc-100 my-6" />

              {/* Simple Benefits List */}
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-3 text-zinc-700 font-bold text-[15px]">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  Pague diretamente na entrega
                </div>
                <div className="flex items-center gap-3 text-zinc-700 font-bold text-[15px]">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  Frete 100% gratis em Cataguases
                </div>
              </div>

            </div>
          </div>

          {/* 4. Main CTA Button & WhatsApp Secondary */}
          <div className="order-4 md:col-start-1 md:row-start-3 content-center pt-2 pb-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative flex w-full items-center justify-center rounded-[1.5rem] bg-gradient-to-b from-red-500 to-red-700 px-6 py-5 text-xl lg:text-2xl font-black tracking-wide text-white shadow-[0_10px_25px_-5px_rgba(220,38,38,0.5)] ring-1 ring-white/20 border-b-4 border-red-900 transition-all hover:translate-y-[2px] hover:border-b-2 active:border-b-0 active:translate-y-[4px] hover:shadow-[0_5px_15px_-5px_rgba(220,38,38,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-3 drop-shadow-md">
                PAGAR NA ENTREGA
                <svg className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </button>

            <a
              href="https://wa.me/553287150119?text=Olá!%20Vi%20o%20anúncio%20da%20furadeira%20em%20Cataguases%20e%20quero%20saber%20se%20ainda%20tem%20disponível"
              target="_blank"
              className="mt-4 flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-green-500 px-5 py-4 text-white font-bold shadow-md transition hover:bg-green-600"
            >
              <span className="flex items-center gap-2 text-base">
                💬 Tirar dúvidas no WhatsApp
              </span>
              <span className="text-sm font-medium opacity-90">
                Clique aqui
              </span>
            </a>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-bold text-zinc-500">
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" /></svg> Compra 100% segura</span>
              <span className="hidden sm:inline text-zinc-300">•</span>
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> Suporte rápido</span>
            </div>
          </div>



        </div>
      </section>

      {/* Middle Section - Dark Theme Segment */}
      <section className="bg-zinc-950 py-16 relative overflow-hidden text-white border-y border-zinc-800">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/20 blur-[100px] pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black md:text-5xl tracking-tight">Cansado de depender de terceiros para resolver coisas simples?</h2>
            <p className="mt-6 text-lg text-zinc-400">
              Tenha em casa uma ferramenta prática, potente e pronta para uso. Ideal para quem quer mais autonomia e performance no dia a dia.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              'Não tem a ferramenta certa quando precisa',
              'Paga muito caro por pequenos serviços',
              'Compra ferramenta fraca e se arrepende',
              'Precisa de entrega rápida na cidade',
            ].map((item, i) => (
              <div key={i} className="group relative rounded-[2rem] bg-zinc-900 p-6 shadow-xl ring-1 ring-white/10 overflow-hidden transition hover:ring-red-500/50">
                <div className="absolute -right-6 -top-6 text-9xl font-black text-white/5 group-hover:text-red-500/5 transition-colors">{i + 1}</div>
                <p className="font-bold leading-7 text-zinc-200 relative z-10">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-red-600">
                <span className="w-2 h-2 rounded-full bg-red-600"></span> Destaque do produto
              </div>
              <h2 className="mt-6 text-4xl font-black text-zinc-950 md:text-5xl tracking-tight leading-[1.1]">Motor 100% cobre e potência brutal</h2>
            </div>
            <div className="space-y-4 text-lg text-zinc-600 font-medium leading-relaxed">
              <p>
                Diferente de modelos comuns, esta ferramenta foi pensada para entregar muito mais tempo de vida, aquecer menos e fornecer alta performance.
              </p>
              <p>
                Com torque máximo de <strong className="text-zinc-900 border-b-2 border-red-500/30">120Nm</strong>, velocidade de <strong>0-1500 RPM</strong> e função <strong className="text-red-600">3 em 1</strong>, ela não te deixa na mão.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Menos aquecimento',
                'Engrenagens metálicas',
                'Força extrema',
                'Uso profissional',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 font-bold text-zinc-800">
                  <div className="flex h-2 w-2 rounded-full bg-red-600"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-100 shadow-2xl ring-1 ring-zinc-200 group perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            <img src={gallery[2]} alt="Detalhes internos da furadeira" className="w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
        </div>
      </section>

      {/* Included Items Section */}
      <section className="bg-zinc-100 py-10 md:py-16 border-y border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 relative overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5 group">
              <img src={gallery[8]} alt="Kit completo da furadeira com acessórios" className="w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-500 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> O que vem na maleta
              </div>
              <h2 className="mt-4 text-3xl font-black text-zinc-950 md:text-4xl tracking-tight leading-[1.05]">
                Conjunto Master <br /><span className="text-red-600">Tudo Incluído</span>
              </h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                {items.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 font-bold text-sm text-zinc-700 shadow-sm ring-1 ring-zinc-200/60 transition hover:bg-zinc-50 hover:ring-zinc-300">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-50/50 text-red-500 ring-1 ring-red-100">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative flex w-full items-center justify-center rounded-[1.5rem] bg-gradient-to-b from-red-500 to-red-700 px-6 py-5 text-xl font-black tracking-wide text-white shadow-[0_10px_25px_-5px_rgba(220,38,38,0.5)] ring-1 ring-white/20 border-b-4 border-red-900 transition-all hover:translate-y-[2px] hover:border-b-2 active:border-b-0 active:translate-y-[4px]"
        >
          <span className="flex items-center gap-3">
            PAGAR NA ENTREGA
            <svg
              className="h-6 w-6 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </button>
      </div>
      {/* Specs Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto text-center mb-12">
            <h2 className="text-3xl font-black text-zinc-950 md:text-5xl tracking-tight">Ficha Técnica</h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-red-600"></div>
          </div>
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-zinc-200">
            <div className="grid divide-y divide-zinc-100">
              {specs.map(([label, value], i) => (
                <div key={label} className={`grid gap-2 px-6 py-5 md:grid-cols-[250px_1fr] md:px-10 transition-colors hover:bg-zinc-50 ${i % 2 === 0 ? 'bg-zinc-50/50' : 'bg-white'}`}>
                  <div className="font-extrabold text-zinc-500 uppercase tracking-wide text-sm flex items-center">{label}</div>
                  <div className="font-bold text-zinc-900 md:text-lg">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal Form Checkout Component */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-sm px-4 py-8 modal-overlay pb-20 md:pb-8">
          <div className="relative w-full max-w-3xl max-h-full overflow-y-auto overflow-x-hidden rounded-[2rem] border border-zinc-200 bg-white p-6 md:p-10 shadow-2xl modal-content">
            <button
              onClick={() => { setIsModalOpen(false); setIsSuccess(false); }}
              className="absolute top-4 right-4 md:top-6 md:right-6 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-red-100 hover:text-red-600 transition-colors z-20"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {isSuccess ? (
              <div className="text-center py-16 md:py-20 lg:py-24">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 border-4 border-green-50">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-3xl font-black text-zinc-950 md:text-4xl tracking-tight">Pedido Reservado!</h2>
                <div className="mt-6 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 max-w-lg mx-auto">
                  <p className="text-lg font-medium text-zinc-600">
                    O seu pedido para Cataguases foi enviado com sucesso.
                  </p>
                  <p className="mt-2 text-zinc-500 text-sm">
                    Nossa equipe entrará em contato pelo seu telefone nas próximas horas para agendar a entrega.
                  </p>
                </div>
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => { setIsModalOpen(false); setIsSuccess(false); }}
                    className="rounded-[1.25rem] bg-zinc-900 px-10 py-4 font-bold text-white transition hover:bg-red-600 hover:shadow-lg"
                  >
                    Voltar para a loja
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-left pr-12 md:text-center md:pr-0 mb-8 border-b border-zinc-100 pb-6">

                  <h2 className="text-2xl font-black text-zinc-950 md:text-4xl tracking-tight">Finalize sua Entrega</h2>
                  <p className="mt-3 font-medium text-zinc-500">
                    Preencha os dados abaixo. Pagamento realizado somente no momento da entrega em <strong className="text-zinc-800">Cataguases</strong>.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/80">
                    <h3 className="text-base font-black uppercase tracking-wider text-zinc-500 mb-6 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 text-xs">1</span>
                      Seus Dados
                    </h3>
                    <div className="grid gap-5 md:grid-cols-2">
                      <FormField label="Nome" name="nome" register={register} error={errors.nome} required placeholder="Ex: João da Silva" />
                      <FormField label="Apelido" name="apelido" register={register} error={errors.apelido} placeholder="Como você é chamado" />
                      <FormField label="WhatsApp" name="telefone" register={register} error={errors.telefone} required placeholder="(32) 99999-9999" onChangeContext={handlePhoneChange} />
                      <FormField label="E-mail (opcional)" name="email" register={register} error={errors.email} placeholder="seu@email.com" type="email" />
                    </div>
                  </div>

                  <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/80">
                    <h3 className="text-base font-black uppercase tracking-wider text-zinc-500 mb-6 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 text-xs">2</span>
                      Onde vamos entregar?
                    </h3>
                    <div className="grid gap-5 md:grid-cols-2">

                      <FormField label="Endereço" name="endereco" register={register} error={errors.endereco} required placeholder="Rua, avenida ou praça" />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField label="Número" name="numero" register={register} error={errors.numero} required placeholder="Ex: 120" />
                        <FormField label="Complemento" name="complemento" register={register} error={errors.complemento} placeholder="Apto" />
                      </div>
                      <FormField label="Bairro" name="bairro" register={register} error={errors.bairro} required placeholder="Ex: Colinas" />
                      <div className="md:col-span-2">
                        <FormField
                          label="Ponto de Referência"
                          name="referencia"
                          register={register}
                          error={errors.referencia}
                          required
                          placeholder="Ex: No portão azul..."
                        />
                      </div>
                      <FormField label="Cidade" name="cidade" register={register} error={errors.cidade} disabled />
                      <FormField label="Estado" name="estado" register={register} error={errors.estado} disabled />
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-zinc-950 p-6 shadow-xl ring-1 ring-zinc-800">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="inline-flex rounded-md bg-red-600/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-500 ring-1 ring-red-500/30 mb-2">
                          Resumo da Compra
                        </div>
                        <p className="font-bold text-white text-lg">Kit Profissional 3 em 1 (21V)</p>
                        <p className="mt-1 text-sm font-medium text-zinc-400">Frete Grátis • Pagamento na entrega</p>
                      </div>
                      <div className="text-left md:text-right border-t border-zinc-800 pt-4 md:pt-0 md:border-t-0">
                        <div className="text-sm font-semibold text-zinc-500 line-through">R$ 249,99</div>
                        <div className="text-4xl font-black text-white">R$ 169,99</div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center rounded-[1.5rem] bg-gradient-to-b from-red-500 to-red-700 px-6 py-5 text-xl font-black tracking-wide text-white shadow-[0_10px_25px_-5px_rgba(220,38,38,0.5)] ring-1 ring-white/20 border-b-4 border-red-900 transition-all hover:translate-y-[2px] hover:border-b-2 active:border-b-0 active:translate-y-[4px] hover:shadow-[0_5px_15px_-5px_rgba(220,38,38,0.5)]"
                  >
                    CONFIRMAR MEU PEDIDO AGORA
                  </button>

                  <p className="text-center font-medium text-xs md:text-sm text-zinc-400 px-4">
                    🔒 Seus dados estão seguros. Ao confirmar, você reserva seu produto para entrega.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="border-t border-zinc-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center text-zinc-400 md:px-6 lg:px-8">
          <p className="font-bold text-zinc-900 mb-2">Furadeira Parafusadeira Profissional</p>
          <p className="text-sm">Atendimento e entrega exclusivos para Cataguases - MG</p>
          <p className="mt-8 text-xs text-zinc-300">© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/553287150119?text=Ol%C3%A1!%20Vi%20o%20an%C3%BAncio%20da%20furadeira%20em%20Cataguases%20e%20quero%20saber%20se%20ainda%20tem%20dispon%C3%ADvel"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 group flex flex-row items-center justify-center gap-2 rounded-full bg-emerald-500 pl-4 pr-5 py-3.5 text-white shadow-[0_10px_30px_-5px_rgba(16,185,129,0.5)] ring-1 ring-white/20 transition-all hover:-translate-y-1 hover:shadow-[0_15px_35px_-5px_rgba(16,185,129,0.6)] active:scale-95"
      >
        <svg className="w-6 h-6 drop-shadow-md relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
        <span className="font-bold tracking-wide drop-shadow-sm">💬 Dúvidas?</span>
      </a>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(30px) scale(0.98); opacity: 0 } to { transform: translateY(0) scale(1); opacity: 1 } }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        @keyframes shine { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        .modal-overlay { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .modal-content { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
