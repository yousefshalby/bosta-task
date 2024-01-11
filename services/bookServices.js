const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createBook = async (title, author, ISBN, quantity, shelfLocation) => {
  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        ISBN,
        quantity,
        shelfLocation,
      },
    });
    console.log('Book created successfully:', newBook);
  } catch (error) {
    console.error('Error creating book:', error);
  } finally {
    await prisma.$disconnect();
  }
};

const getAllBooks = async (req) => {
    try {
    // Extract the search parameters from the request
      const { title, author, isbn } = req.query;

      // Define the where condition based on the search parameters
      const whereCondition = title || author || isbn
        ? {
            OR: [
              title ? { title: { contains: title } } : {},
              author ? { author: { contains: author } } : {},
              isbn ? { isbn: { contains: isbn } } : {},
            ],
          }
        : {};
      const books = await prisma.book.findMany({
        where: whereCondition,
      });
  
      console.log('Books found:', books);
      return books;
    } catch (error) {
      console.error('Error getting books:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  };

const updateBook = async (id, newData) => {
  try {
    const updatedBook = await prisma.book.update({
      where: { id },
      data: newData,
    });
    console.log('Book updated successfully:', updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
  } finally {
    await prisma.$disconnect();
  }
};

const deleteBook = async (id) => {
  try {
    const deletedBook = await prisma.book.delete({
      where: { id },
    });
    console.log('Book deleted successfully:', deletedBook);
  } catch (error) {
    console.error('Error deleting book:', error);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = { createBook, getAllBooks, updateBook, deleteBook };
