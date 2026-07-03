export function limparNumero(v: string): string {
  return v.replace(/\D/g, '')
}

export function validarCPF(v: string): boolean {
  const cpf = limparNumero(v)
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

  const digitos = cpf.split('').map(Number)

  const calcDigito = (base: number[]) => {
    let soma = 0
    let peso = base.length + 1
    for (const d of base) {
      soma += d * peso
      peso--
    }
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  const d1 = calcDigito(digitos.slice(0, 9))
  const d2 = calcDigito(digitos.slice(0, 10))

  return d1 === digitos[9] && d2 === digitos[10]
}

export function validarCNPJ(v: string): boolean {
  const cnpj = limparNumero(v)
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false

  const digitos = cnpj.split('').map(Number)

  const calcDigito = (base: number[]) => {
    const pesos = base.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let soma = 0
    for (let i = 0; i < base.length; i++) soma += base[i] * pesos[i]
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  const d1 = calcDigito(digitos.slice(0, 12))
  const d2 = calcDigito(digitos.slice(0, 13))

  return d1 === digitos[12] && d2 === digitos[13]
}

export function formatarCPF(v: string): string {
  const cpf = limparNumero(v).padEnd(11, '_').slice(0, 11)
  return cpf.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, (_, a, b, c, d) => {
    let out = a
    if (b) out += `.${b}`
    if (c) out += `.${c}`
    if (d) out += `-${d}`
    return out
  }).replace(/_/g, '')
}

export function formatarCNPJ(v: string): string {
  const cnpj = limparNumero(v).slice(0, 14)
  return cnpj.replace(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/, (_, a, b, c, d, e) => {
    let out = a
    if (b) out += `.${b}`
    if (c) out += `.${c}`
    if (d) out += `/${d}`
    if (e) out += `-${e}`
    return out
  })
}

function randomDigits(n: number): number[] {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 10))
}

export function gerarCPF(): string {
  const calcDigito = (base: number[]) => {
    let soma = 0
    let peso = base.length + 1
    for (const d of base) {
      soma += d * peso
      peso--
    }
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  const base = randomDigits(9)
  const d1 = calcDigito(base)
  const d2 = calcDigito([...base, d1])
  const cpf = [...base, d1, d2].join('')
  return formatarCPF(cpf)
}

export function gerarCNPJ(): string {
  const calcDigito = (base: number[]) => {
    const pesos = base.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let soma = 0
    for (let i = 0; i < base.length; i++) soma += base[i] * pesos[i]
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  const base = randomDigits(8).concat([0, 0, 0, 1])
  const d1 = calcDigito(base)
  const d2 = calcDigito([...base, d1])
  const cnpj = [...base, d1, d2].join('')
  return formatarCNPJ(cnpj)
}
