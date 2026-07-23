const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // 1. Create Mock Restaurants
  const ovenStory = await prisma.restaurant.create({
    data: {
      owner: {
        create: { name: 'Oven Story Owner', email: 'owner@ovenstory.com', password: 'password', role: 'RESTAURANT' }
      },
      name: 'Oven Story',
      cuisine: 'Pizza',
      logo: '/assets/images/s-3.png',
      isVerified: true,
      isOpen: true,
      address: 'Sector 4, HSR',
      menuItems: {
        create: [
          { name: 'Paneer Tikka Pizza', price: 290, category: 'Pizza', image: '/assets/images/s-img-2.jpg' },
          { name: 'Classic Margherita', price: 210, category: 'Pizza', image: '/assets/images/p-6.jpg' },
          { name: 'Veggie Supreme Pizza', price: 340, category: 'Pizza', image: '/assets/images/s-img-2.jpg' }
        ]
      }
    }
  });

  const faasos = await prisma.restaurant.create({
    data: {
      owner: {
        create: { name: 'Faasos Owner', email: 'owner@faasos.com', password: 'password', role: 'RESTAURANT' }
      },
      name: 'Faasos',
      cuisine: 'Wraps',
      logo: '/assets/images/s-1.png',
      isVerified: true,
      isOpen: true,
      address: 'Koramangala',
      menuItems: {
        create: [
          { name: 'Double Cheese Paneer Wrap', price: 160, category: 'Wrap', image: '/assets/images/s-img-1.jpg' },
          { name: 'Classic Masala Wrap', price: 130, category: 'Wrap', image: '/assets/images/p-1.jpg' }
        ]
      }
    }
  });

  const wendys = await prisma.restaurant.create({
    data: {
      owner: {
        create: { name: 'Wendys Owner', email: 'owner@wendys.com', password: 'password', role: 'RESTAURANT' }
      },
      name: "Wendy's",
      cuisine: 'Burger',
      logo: '/assets/images/s-2.png',
      isVerified: true,
      isOpen: true,
      address: 'Indiranagar',
      menuItems: {
        create: [
          { name: 'Classic Crispy Veg', price: 120, category: 'Burger', image: '/assets/images/p-1.jpg' },
          { name: 'Double Cheese Bacon Burger', price: 190, category: 'Burger', image: '/assets/images/s-img-1.jpg' }
        ]
      }
    }
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
