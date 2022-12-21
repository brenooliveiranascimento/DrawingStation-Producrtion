import { ISubscription } from '../interfaces/ISubscription';

export const plans: ISubscription[] = [
  { type: '/subscription/mensal', value: '34,00/Mês', description: 'Assinatura mensal' },
  { type: '/subscription/anual', value: '367,00/Ano 15% de desconto', description: 'Assinatura Anual!' },
  { type: null, value: 'Portal do assinante', description: 'Atualize/Cancele seus planos' }
];