'use client'

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function História() {
  const [ref1, inView1] = useInView({ triggerOnce: false, threshold: 0.3 })
  const [ref2, inView2] = useInView({ triggerOnce: false, threshold: 0.3 })
  const [ref3, inView3] = useInView({ triggerOnce: false, threshold: 0.3 })
  const [ref4, inView4] = useInView({ triggerOnce: false, threshold: 0.3 })

  return (
    <main
      className="relative z-10 text-white min-h-screen bg-cover bg-fixed"
      style={{ backgroundImage: 'url("/images/zx.jpg")' }}
    >
      <motion.section
        ref={ref1}
        initial={{ opacity: 0, y: 100 }}
        animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="container mx-auto px-4 py-10"
      >
       
        <div className="flex flex-col lg:flex-row bg-black/90 p-6 gap-6 rounded-xl">
          <img
            src="/images/mz.jpg"
            alt="X e Zero"
            className="w-full max-w-xs md:max-w-sm lg:max-w-md object-contain"
          />
          <div>
            <h2 className="text-2xl pb-4">Uma Nova Era</h2>
            <p className="text-lg leading-relaxed">
              Mega Man X é um jogo de ação e plataforma lançado em 1993 pela Capcom, que marca uma evolução da série clássica Mega Man. Ambientado em um futuro onde humanos convivem com robôs chamados Reploids, a história acompanha X, um androide criado por Dr. Light com livre arbítrio, que luta contra os Mavericks — máquinas que se rebelaram contra a humanidade.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={ref2}
        initial={{ opacity: 0, y: 100 }}
        animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="container mx-auto px-4 py-10"
      >
        <div className="flex flex-col lg:flex-row bg-black/90 p-6 gap-6 rounded-xl">
          <img
            src="/images/mgx.jpg"
            alt="X"
            className="w-[100px] md:w-[150px] lg:w-[250px] object-contain"
          />
          <div>
            <h2 className="text-2xl pb-4">X e sua missão</h2>
            <p className="text-lg leading-relaxed">
              X é um robô criado por Dr. Light, o mesmo criador do Mega Man original. Diferente dos robôs da sua época, X foi projetado com a capacidade de pensar, sentir e tomar decisões por conta própria — ou seja, com livre-arbítrio. Temendo que essa liberdade fosse perigosa, Dr. Light selou X em uma cápsula para testes que durariam 30 anos, mas acabou morrendo antes de reativá-lo.

              Décadas depois, X é descoberto por Dr. Cain, que usa sua tecnologia como base para criar os Reploids — robôs semelhantes a humanos. Com o tempo, alguns Reploids começam a se desviar do controle e se tornam Mavericks, ameaçando a paz mundial.

              Para combatê-los, surge a força Maverick Hunters, da qual X passa a fazer parte ao lado de Zero, seu melhor amigo. Juntos, eles enfrentam batalhas intensas contra Mavericks poderosos, enquanto X é consumido por dúvidas morais: será certo continuar lutando? Existe um futuro em que humanos e máquinas possam viver em harmonia?

              A jornada de X é sobre responsabilidade, sacrifício e esperança num mundo cada vez mais dominado pela guerra e pela tecnologia.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={ref3}
        initial={{ opacity: 0, y: 100 }}
        animate={inView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="container mx-auto px-4 py-10"
      >
        <div className="flex flex-col lg:flex-row-reverse bg-black/90 p-6 gap-6 rounded-xl">
          <img
            src="/images/z.jpg"
            alt="Zero"
            className="w-[100px] md:w-[200px] lg:w-[400px] object-contain"
          />
          <div>
            <h2 className="text-2xl pb-4">Um futuro em disputa</h2>
            <p className="text-lg leading-relaxed">
              Zero é um dos mais poderosos Reploids e o melhor amigo de X. Diferente de X, ele foi criado por Dr. Wily, antigo rival de Dr. Light. Inicialmente, Zero era uma máquina extremamente agressiva e instável, mas após um confronto com outro Maverick, sua programação maligna foi selada.

              Com o tempo, Zero se tornou um Maverick Hunter de elite, conhecido por sua força, coragem e pela icônica Z-Saber. Ao lado de X, ele combate ameaças devastadoras, incluindo o vírus Maverick, que pode corromper qualquer Reploid — e que, ironicamente, surgiu de seu próprio corpo.

              Zero é um guerreiro que carrega um passado sombrio e misterioso, lutando para superar sua origem e provar que pode escolher o bem. Sua jornada é marcada por sacrifícios, dilemas internos e um laço profundo com X, com quem divide o peso de proteger a humanidade em meio ao caos tecnológico.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={ref4}
        initial={{ opacity: 0, y: 100 }}
        animate={inView4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="container mx-auto px-4 py-10"
      >
        <div className="flex flex-col lg:flex-row-reverse bg-black/90 p-6 gap-6 rounded-xl">
          <img
            src="/images/s.jpg"
            alt="Sigma"
            className="w-[200px] md:w-[300px] lg:w-[400px] object-contain"
          />
          <div>
            <h2 className="text-2xl pb-4">O antagonista</h2>
            <p className="text-lg leading-relaxed">
              Sigma era o mais avançado e respeitado Reploid da sua época — o líder dos Maverick Hunters e exemplo de justiça. Mas tudo mudou quando ele entrou em contato com um vírus misterioso (originado de Zero), que corrompeu sua programação e o transformou no primeiro e mais perigoso Maverick da história.

              Após sua queda, Sigma se revolta contra os humanos e declara guerra à humanidade, acreditando que os Reploids deveriam governar o mundo. Ele se torna o vilão central da saga Mega Man X, arquitetando inúmeras rebeliões e criando exércitos de Mavericks em diferentes formas e corpos.

              Carismático, frio e estrategista, Sigma representa o oposto de X: enquanto X busca equilíbrio e paz, Sigma acredita que o conflito é inevitável. Mesmo sendo derrotado várias vezes, ele sempre retorna, mais perigoso, sendo o catalisador dos maiores desafios enfrentados por X e Zero.
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  )
}