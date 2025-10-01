import prisma from '../lib/prisma.js';
class CarrinhoRepoPrisma {
  async adicionarProduto(nome, { preco, quantidade }) {
    const produtoExistente = await prisma.produto.findUnique({
      where: { nome },
    });

    if (!produtoExistente) {
      const produtoCriado = await prisma.produto.create({
        data: { nome, preco, quantidade },
      });

      return produtoCriado;
    }

    if (produtoExistente) {
      const produtoUpdate = await prisma.produto.update({
        where: { id: produtoExistente.id },
        data: {
          preco,
          quantidade: produtoExistente.quantidade + quantidade,
        },
      });

      return produtoUpdate;
    }
  }

  async remover(nome) {
    /*    const busca = await prisma.produto.findUnique({
      where: { nome },
    });

    if (!busca) {
      return false;
    } 
*/
    try {
      return await prisma.produto.delete({
        where: { nome },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }

  async alterarQuantidade(nome, quantidade) {
    try {
      const update = await prisma.produto.update({
        where: { nome },
        data: { quantidade },
      });
      return update;
    } catch (error) {
      if (error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  }

  async listar() {
    return await prisma.produto.findMany();
  }

  async calcularTotal() {
    const produto = await prisma.produto.findMany();

    let total = 0;

    for (const { preco, quantidade } of produto) {
      total += preco * quantidade;
    }
    return total;
  }
}
export default CarrinhoRepoPrisma;
