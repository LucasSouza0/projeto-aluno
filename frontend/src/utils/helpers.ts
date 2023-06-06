export type PropsMasck = {
  value: string;
  type: '' | 'cnpj' | 'cpf' | 'cep' | 'phone' | 'cpfcnpj' | 'price' | 'porcentage' | 'slug' | 'color';
}

export function empty(value: any) {
  return !(
    !!value ?
      typeof value === 'object' ?
        Array.isArray(value) ?
          !!value.length :
          !!Object.keys(value).length :
        true :
      false
  );
}

export function numberMask(value: number | string, verificaPontos = false, type?: string): string {
  if (typeof value == 'string' && value != '' && verificaPontos) {
    value = value.replace('%', '');
    value = value.replace('R$', '');
    value = value.replace(/\./g, '');
    value = value.replace(',', '.');
    value = value.replace(' ', '');
  }

  value = value.toString() == '' ? 0 : value;

  if (typeof value != 'number') {
    value = parseFloat(value);
  }

  if (type == '%') {
    value = value.toFixed(2);
  } else {
    value = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 });
  }

  return value.trim();
}

export function numberFormat(value: number | string): number {
  value = value.toString() == '' ? 0 : value;

  if (typeof value == 'string' && value != '') {
    value = value.replace(/\D/g, '');
    value = (parseFloat(value) / 100).toFixed(2);
    value = value.replace('.', ',');

    value = value.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    value = value.replace(/(\d)(\d{3}),/g, "$1.$2,");
  }

  if (typeof value != 'number') {
    value = value.replace(/\./g, '');
    value = value.replace(',', '.');
    value = parseFloat(value);
  }

  return value;
}

export function TextFormat({ value, type }: PropsMasck): string {
  if (value) {
    switch (type) {
      case 'cnpj':
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '$1.$2');
        value = value.replace(/(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/(\d{3})(\d)/, '$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
        break;
      case 'cpf':
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        break;
      case 'cep':
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        break;
      case 'phone':
        if (value.length <= 14) {
          value = value.replace(/\D/g, "");
          value = value.replace(/^(\d\d)(\d)/g, "($1) $2");
          value = value.replace(/(\d{4})(\d)/, "$1-$2");
        }

        if (value.length === 15) {
          value = value.replace(/\D/g, "");
          value = value.replace(/^(\d\d)(\d)/g, "($1) $2");
          value = value.replace(/(\d{5})(\d)/, "$1-$2");
        }

        break;
      case 'cpfcnpj':
        if (value.length <= 14) {
          value = value.replace(/\D/g, "");
          value = value.replace(/(\d{3})(\d)/, "$1.$2");
          value = value.replace(/(\d{3})(\d)/, "$1.$2");
          value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else {
          value = value.replace(/\D/g, "");
          value = value.replace(/(\d{2})(\d)/, "$1.$2");
          value = value.replace(/(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
          value = value.replace(/(\d{3})(\d)/, "$1/$2");
          value = value.replace(/(\d{4})(\d)/, "$1-$2");
        }
        break;
      case 'price':
        value = numberMask(numberFormat(value), true);
        break;
      case 'porcentage':
        value = numberMask(value, true, '%');
        break;
      case 'slug':
        value = value.toLowerCase();
        value = value.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[0-9]/g, '')
          .replace(/[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/g, '')
          .replaceAll(' ', '-');

        if (!value.includes('/')) {
          value = `/${value}`;
        }
        break;
      case 'color':
        value.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[0-9]/g, '')
          .replace(/[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/g, '')

        if (!value.includes('#')) {
          value = `#${value}`;
        }

        break;
    }
  }

  return value;
}
