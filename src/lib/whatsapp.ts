export function getWhatsappLink(message: string): string {
  return `https://wa.me/5531994273473?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  geral: 'Oi, vim pelo site e gostaria de entender qual tratamento seria ideal para mim.',
  luminapele: 'Oi, vim pelo site e gostaria de saber mais sobre o Método Luminapele para tratamento de melasma.',
  psicanalise: 'Oi, vim pelo site e gostaria de agendar uma sessão de Psicanálise.',
  reiki: 'Oi, vim pelo site e gostaria de saber mais sobre as terapias integrativas e Reiki.',
  rejuvenescimento: 'Oi, vim pelo site e gostaria de conhecer os tratamentos de rejuvenescimento facial.',
  limpeza: 'Oi, vim pelo site e gostaria de agendar uma limpeza de pele.',
};
