export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'media' | 'calc' | 'text' | 'utility';
  icon: string;
}
