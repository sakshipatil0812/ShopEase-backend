const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load environment variables
dotenv.config();

// Product data - 10 products per category
const products = [
  // Electronics (10 products)
  {
    name: 'Apple MacBook Pro 14" M3',
    description: 'Experience unparalleled performance with the Apple MacBook Pro 14" featuring the revolutionary M3 chip. This powerhouse laptop combines cutting-edge technology with stunning design, offering 16GB of unified memory and 512GB SSD storage. Perfect for creative professionals, developers, and power users who demand the best. The Liquid Retina XDR display delivers breathtaking visuals with 1000 nits sustained brightness. Enjoy up to 17 hours of battery life, advanced thermal design, and seamless compatibility with all your favorite apps. Includes three Thunderbolt 4 ports, HDMI, SD card slot, and MagSafe 3 charging. The Space Black finish adds a touch of elegance to your workspace.',
    price: 189999,
    imageURL: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    category: 'Electronics',
    stock: 25,
    brand: 'Apple',
    tags: ['laptop', 'macbook', 'computer', 'm3'],
    averageRating: 4.8,
    numReviews: 156
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Immerse yourself in pure audio bliss with the Sony WH-1000XM5, the industry-leading noise-canceling wireless headphones. Featuring two powerful processors and eight microphones, these headphones deliver unprecedented noise cancellation that adapts to your environment in real-time. The 30mm driver units with carbon fiber composite material produce exceptional sound quality across all frequencies. Enjoy 30-hour battery life with quick charging (3 minutes for 3 hours playback). Multipoint connection allows seamless switching between two devices. Premium soft-fit leather and lightweight design ensure all-day comfort. Speak-to-Chat technology automatically pauses music when you start talking. Includes carrying case and airplane adapter.',
    price: 29999,
    imageURL: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
    category: 'Electronics',
    stock: 50,
    brand: 'Sony',
    tags: ['headphones', 'wireless', 'noise-canceling'],
    averageRating: 4.7,
    numReviews: 203
  },
  {
    name: 'Samsung 55" 4K Smart TV',
    description: 'Transform your living room into a home theater with the Samsung 55" Crystal UHD 4K Smart TV. This stunning television features Crystal Processor 4K that upscales all your content to near-4K quality. Dynamic Crystal Color technology delivers over a billion shades of brilliant color. HDR support (HDR10+) enhances contrast and brings out hidden details. Built-in Alexa and Bixby voice assistants allow hands-free control. Access unlimited entertainment through Smart Hub with apps like Netflix, Prime Video, Disney+, and more. Motion Xcelerator ensures smooth action scenes perfect for sports and gaming. Adaptive Sound automatically optimizes audio based on content. Three HDMI ports, USB connectivity, and built-in WiFi. Slim AirSlim design complements any décor. Q-Symphony compatible for enhanced audio when paired with Samsung soundbar.',
    price: 54999,
    imageURL: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
    category: 'Electronics',
    stock: 15,
    brand: 'Samsung',
    tags: ['tv', '4k', 'smart-tv', 'television'],
    averageRating: 4.6,
    numReviews: 89
  },
  {
    name: 'Canon EOS R6 Mark II Camera',
    description: 'Capture life\'s precious moments in stunning detail with the Canon EOS R6 Mark II, a full-frame mirrorless camera designed for serious photographers and videographers. The 24.2MP CMOS sensor with DIGIC X processor delivers exceptional image quality even in low light (up to ISO 102400). Shoot continuous bursts at 40fps electronic shutter or 12fps mechanical shutter with advanced subject detection and tracking. Record professional 6K RAW video and 4K 60p oversampled footage with Canon Log 3 for maximum dynamic range. In-body 5-axis image stabilization provides up to 8 stops of shake correction. Dual UHS-II SD card slots ensure reliable storage. Weather-sealed magnesium alloy body withstands challenging conditions. Vari-angle touchscreen and high-resolution EVF enhance shooting flexibility. Perfect for weddings, wildlife, sports, and content creation.',
    price: 234999,
    imageURL: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
    category: 'Electronics',
    stock: 10,
    brand: 'Canon',
    tags: ['camera', 'dslr', 'photography', 'mirrorless'],
    averageRating: 4.9,
    numReviews: 67
  },
  {
    name: 'Dell XPS 15 Laptop',
    description: 'The Dell XPS 15 redefines premium laptop performance with its stunning 15.6" InfinityEdge display that delivers 100% sRGB color accuracy. Powered by 12th Gen Intel Core i7 processor with 16GB DDR5 RAM and 512GB PCIe NVMe SSD, this laptop handles demanding tasks with ease. The NVIDIA GeForce RTX 3050 Ti graphics card enables smooth gaming and creative workflows. Premium machined aluminum chassis with carbon fiber palm rest provides durability and comfort. Backlit keyboard with large precision touchpad enhances productivity. Four Thunderbolt 4 ports offer versatile connectivity. Dual-array microphones and quad-speaker design with Waves MaxxAudio Pro deliver crystal-clear video calls and immersive audio. Up to 13 hours battery life keeps you productive all day. Killer Wi-Fi 6E ensures ultra-fast wireless connectivity. Perfect for content creators, engineers, and business professionals.',
    price: 145999,
    imageURL: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
    category: 'Electronics',
    stock: 30,
    brand: 'Dell',
    tags: ['laptop', 'dell', 'computer', 'xps'],
    averageRating: 4.5,
    numReviews: 124
  },
  {
    name: 'LG 27" 4K Monitor',
    description: 'Elevate your visual experience with the LG 27" UHD 4K IPS Monitor featuring stunning 3840x2160 resolution that brings your content to life with incredible detail. The IPS panel delivers accurate colors from wide viewing angles (178°/178°). HDR10 support enhances contrast ratio for deeper blacks and brighter whites. AMD FreeSync technology eliminates screen tearing for smooth gaming. USB-C connectivity with 60W power delivery allows single-cable setup with compatible laptops. OnScreen Control software enables easy multitasking with split-screen options. Flicker-safe and Reader Mode reduce eye strain during extended use. VESA mount compatible for flexible positioning. Three-side virtually borderless design maximizes screen real estate. Perfect for photo/video editing, graphic design, programming, and productivity. Includes HDMI, DisplayPort, and USB hub for versatile connectivity.',
    price: 34999,
    imageURL: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
    category: 'Electronics',
    stock: 40,
    brand: 'LG',
    tags: ['monitor', '4k', 'display', 'screen'],
    averageRating: 4.6,
    numReviews: 98
  },
  {
    name: 'Logitech MX Master 3S Mouse',
    description: 'Experience ultimate precision and comfort with the Logitech MX Master 3S, the flagship wireless performance mouse designed for power users and professionals. The revolutionary MagSpeed electromagnetic scrollwheel delivers ultra-precise, silent scrolling with the ability to scroll 1,000 lines per second. 8K DPI Darkfield sensor tracks flawlessly on any surface including glass. Ergonomic design with thumb rest reduces hand strain during extended use. Quiet clicks reduce noise by 90% for distraction-free work. Connect up to three devices via Bluetooth or Logi Bolt USB receiver and switch seamlessly between them. Customizable buttons with Logi Options+ software enable workflow optimization. USB-C quick charging provides 70 days of use on a full charge (3 hours with 1-minute charge). Premium materials with textured grip ensure durability and comfort.',
    price: 8999,
    imageURL: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    category: 'Electronics',
    stock: 100,
    brand: 'Logitech',
    tags: ['mouse', 'wireless', 'accessory'],
    averageRating: 4.7,
    numReviews: 234
  },
  {
    name: 'HP LaserJet Pro Printer',
    description: 'Maximize office productivity with the HP LaserJet Pro All-in-One Color Laser Printer, engineered for small to medium businesses. This versatile multifunction device combines printing, scanning, copying, and faxing in one compact unit. Print professional-quality documents at speeds up to 28 pages per minute with crisp 600x600 dpi resolution. Automatic two-sided printing saves paper and reduces environmental impact. 250-sheet input tray and 100-sheet output tray minimize refills. Built-in wireless connectivity (WiFi, Ethernet, USB) enables printing from smartphones, tablets, and computers via HP Smart app, Apple AirPrint, and Google Cloud Print. 2.7-inch color touchscreen simplifies navigation and job monitoring. Original HP toner cartridges yield up to 1,500 pages (black) and 1,300 pages (color). Flatbed scanner with 1200 dpi optical resolution captures fine details. Security features include password protection and secure boot. Energy Star certified for efficiency. Includes starter toner cartridges and power cable. Perfect for busy offices requiring reliable, high-quality color printing.',
    price: 24999,
    imageURL: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500',
    category: 'Electronics',
    stock: 20,
    brand: 'HP',
    tags: ['printer', 'laserjet', 'office'],
    averageRating: 4.4,
    numReviews: 76
  },
  {
    name: 'Bose SoundLink Speaker',
    description: 'Elevate your audio experience with the Bose SoundLink Revolve+ Portable Bluetooth Speaker, featuring revolutionary 360-degree sound that fills any space with rich, immersive audio. The innovative acoustic deflector and dual-opposing passive radiators deliver deep, powerful bass and crisp highs from a surprisingly compact design. Premium aluminum body with seamless anodized finish provides durability and elegant aesthetics. Up to 16 hours of battery life keeps the music playing all day and night. Built-in speakerphone with advanced microphone array ensures crystal-clear conference calls. IPX4 water-resistant rating protects against splashes and rain for worry-free outdoor use. Wireless range up to 30 feet with stable Bluetooth 4.2 connectivity. Connect two SoundLink speakers in Party Mode for synchronized sound or Stereo Mode for true left-right separation. Flexible fabric handle for easy carrying. Voice prompts guide you through Bluetooth pairing. USB-C charging port. Works with Alexa-enabled devices. Includes charging cradle and power adapter. Perfect for beach trips, pool parties, camping adventures, or home entertainment.',
    price: 14999,
    imageURL: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    stock: 60,
    brand: 'Bose',
    tags: ['speaker', 'bluetooth', 'portable', 'wireless'],
    averageRating: 4.8,
    numReviews: 189
  },
  {
    name: 'Western Digital 2TB External HDD',
    description: 'Safeguard your precious memories and important files with the Western Digital Elements 2TB Portable External Hard Drive, combining massive storage capacity with ultimate portability. This ultra-reliable USB 3.0 drive offers blazing-fast data transfer speeds up to 5Gbps - 10x faster than USB 2.0, enabling quick backup of large files, photos, videos, and documents. Sleek, compact design fits easily in your pocket or laptop bag for storage on the go. Plug-and-play functionality works instantly with Windows (formatted for NTFS) and compatible with Mac after reformatting. Energy-efficient design draws power directly from USB port, eliminating need for separate power adapter. Durable shock-resistant enclosure protects against accidental drops. Pre-loaded WD Backup software enables automatic, scheduled backups to protect against data loss. Password protection and hardware encryption available with WD Security software (download required). LED activity indicator shows power and data transfer status. Backward compatible with USB 2.0 ports. Includes 18-inch USB 3.0 cable. Perfect for students, photographers, videographers, and anyone needing reliable, portable storage. 3-year manufacturer warranty for peace of mind.',
    price: 5999,
    imageURL: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
    category: 'Electronics',
    stock: 75,
    brand: 'Western Digital',
    tags: ['hard-drive', 'storage', 'backup'],
    averageRating: 4.5,
    numReviews: 312
  },

  // Fashion (10 products)
  {
    name: 'Levi\'s 501 Original Jeans',
    description: 'Discover the legendary Levi\'s 501 Original Jeans, an iconic piece of American fashion history since 1873. These classic straight-fit jeans feature the original button fly design that started it all. Crafted from premium 100% cotton denim with just the right amount of structure and comfort. The authentic straight leg silhouette sits at the waist and is regular through the thigh with a straight leg opening. Signature arcuate stitching on back pockets and the iconic red Levi\'s tab make these instantly recognizable. Five-pocket styling provides practical storage. Available in classic blue wash with natural fading for that authentic vintage look. Durable construction ensures these jeans will be a wardrobe staple for years to come. Machine washable for easy care. Perfect for casual everyday wear or dressed up with a blazer. True to size fit that only gets better with wear.',
    price: 3999,
    imageURL: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    category: 'Fashion',
    stock: 80,
    brand: 'Levi\'s',
    tags: ['jeans', 'denim', 'pants', 'casual'],
    averageRating: 4.6,
    numReviews: 456
  },
  {
    name: 'Nike Air Max Sneakers',
    description: 'Step into ultimate comfort and style with the Nike Air Max Sneakers, featuring the revolutionary Air cushioning technology that changed the game. These iconic running shoes combine performance engineering with street-ready style. The visible Max Air unit in the heel provides exceptional impact absorption and all-day comfort. Breathable mesh upper with synthetic overlays offers lightweight support and ventilation. Durable rubber outsole with waffle pattern delivers superior traction on various surfaces. Foam midsole enhances cushioning and energy return with every step. Padded collar and tongue prevent irritation during long wear. Pull tabs on tongue and heel enable easy on/off. Classic Nike Swoosh branding on sides. Available in versatile colorway that pairs with any outfit. Perfect for running, gym workouts, or casual streetwear. Suitable for all-day wear whether you\'re training or exploring the city.',
    price: 8999,
    imageURL: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Fashion',
    stock: 100,
    brand: 'Nike',
    tags: ['shoes', 'sneakers', 'sports', 'running'],
    averageRating: 4.7,
    numReviews: 523
  },
  {
    name: 'Zara Slim Fit Blazer',
    description: 'Elevate your professional wardrobe with this sophisticated Zara Slim Fit Blazer, expertly tailored for the modern professional. Crafted from premium poly-viscose blend fabric that resists wrinkles and maintains its shape throughout the day. The contemporary slim-fit silhouette flatters your frame while allowing comfortable movement. Structured shoulders and darted back create a polished, tailored appearance. Single-breasted design with two-button closure offers timeless versatility. Notch lapel with functioning buttonhole for pocket square. Two front flap pockets and interior chest pocket provide practical storage. Fully lined interior with branded lining adds luxury and ease of wear. Four-button working cuffs showcase attention to detail. Available in classic charcoal gray that pairs effortlessly with dress pants or jeans. Perfect for office presentations, business meetings, weddings, or smart-casual occasions. Dry clean recommended to maintain premium finish.',
    price: 5999,
    imageURL: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500',
    category: 'Fashion',
    stock: 45,
    brand: 'Zara',
    tags: ['blazer', 'formal', 'jacket', 'office'],
    averageRating: 4.5,
    numReviews: 167
  },
  {
    name: 'H&M Cotton T-Shirt Pack (3)',
    description: 'Build your wardrobe essentials with this H&M Premium Cotton T-Shirt 3-Pack, featuring versatile colors perfect for everyday wear. Each tee is crafted from 100% organic cotton with superior softness and breathability for all-day comfort. Classic crew neck design with reinforced stitching prevents stretching and maintains shape after repeated washing. Regular fit silhouette flatters all body types without being too tight or too loose. Ribbed neckline with taped shoulders ensures durability. Double-stitched sleeves and hem provide long-lasting construction. Set includes three coordinating colors (Black, White, Navy) that pair effortlessly with jeans, chinos, or shorts. Tagless interior label eliminates skin irritation. Pre-shrunk fabric maintains size and fit wash after wash. Oeko-Tex Standard 100 certified fabric free from harmful chemicals. Medium weight (180 GSM) offers year-round versatility - wear alone in summer or layer under jackets in cooler months. Machine washable in cold water for easy care. Sustainable choice: Organic cotton farming uses less water and no pesticides. Perfect for casual outings, gym wear, lounging at home, or as undershirts. Unbeatable value with premium quality.',
    price: 1499,
    imageURL: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'Fashion',
    stock: 150,
    brand: 'H&M',
    tags: ['tshirt', 'casual', 'cotton', 'basics'],
    averageRating: 4.4,
    numReviews: 678
  },
  {
    name: 'Adidas Track Pants',
    description: 'Embrace athletic style and supreme comfort with these iconic Adidas Tiro Track Pants, featuring the legendary 3-stripes design that defines sportswear excellence. Constructed from lightweight, breathable polyester fabric with moisture-wicking Climalite technology that pulls sweat away from skin to keep you dry during intense workouts or casual wear. Slim-fit tapered design creates a modern, streamlined silhouette that looks great both on and off the field. Elastic waistband with adjustable drawcord provides personalized fit and security. Signature 3-stripes branding runs down both legs in contrasting color. Two zippered side pockets safely store phone, keys, and wallet. Ankle zips enable easy on-off over shoes and allow ventilation adjustment. Stretchy, flexible fabric with added spandex allows full range of motion for running, training, or yoga. Ribbed cuffs create a snug, athletic fit around ankles. Embroidered Adidas logo on left thigh showcases authentic branding. Available in classic black with white stripes. Machine washable for easy maintenance. Quick-drying material perfect for active lifestyles. Suitable for soccer practice, gym sessions, jogging, or comfortable loungewear. Unisex design appeals to all athletes and athleisure enthusiasts.',
    price: 2999,
    imageURL: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    category: 'Fashion',
    stock: 90,
    brand: 'Adidas',
    tags: ['pants', 'sports', 'athletic', 'casual'],
    averageRating: 4.6,
    numReviews: 234
  },
  {
    name: 'Ray-Ban Aviator Sunglasses',
    description: 'Protect your eyes in legendary style with the iconic Ray-Ban Original Aviator Sunglasses, an American classic since 1937 originally designed for U.S. military pilots. These timeless shades feature distinctive teardrop-shaped lenses that provide maximum eye coverage and superior UV protection. Premium crystal glass lenses with 100% UV400 coating block harmful UVA and UVB rays while delivering unparalleled optical clarity and scratch resistance. Lightweight gold-plated metal frame combines durability with elegant aesthetics. Adjustable silicone nose pads ensure comfortable, non-slip fit for all-day wear. Flexible, spring-loaded temples with acetate tips prevent pressure points behind ears. Double bridge bar adds structural integrity and distinctive style. Classic green G-15 lens tint reduces glare without distorting colors - perfect for driving and outdoor activities. Polarized option available for enhanced glare reduction on water and snow. Comes in multiple sizes (Small 55mm, Medium 58mm, Large 62mm lens width) to suit different face shapes. Includes premium Ray-Ban hard case, microfiber cleaning cloth, and authenticity certificate. Prescription lens compatible (visit optician). Hand-assembled in Italy with meticulous craftsmanship. Suitable for men and women seeking timeless elegance.',
    price: 12999,
    imageURL: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    category: 'Fashion',
    stock: 60,
    brand: 'Ray-Ban',
    tags: ['sunglasses', 'eyewear', 'accessories', 'aviator'],
    averageRating: 4.8,
    numReviews: 389
  },
  {
    name: 'Fossil Leather Watch',
    description: 'Make a sophisticated statement with the Fossil Grant Chronograph Leather Watch, blending vintage-inspired design with modern functionality. Features a 44mm stainless steel case with gunmetal finish, Roman numeral markers, and three chronograph sub-dials for precise timekeeping. The genuine brown leather strap with croco-embossed texture develops beautiful patina over time. Japanese quartz movement ensures accuracy within 15 seconds per month. Water resistant to 50 meters, suitable for daily wear and short swimming. Includes date window, mineral crystal, adjustable buckle closure, and Fossil presentation tin. 11-year warranty covers defects. Perfect for formal occasions, business meetings, or smart-casual outings.',
    price: 9999,
    imageURL: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500',
    category: 'Fashion',
    stock: 35,
    brand: 'Fossil',
    tags: ['watch', 'accessories', 'leather', 'timepiece'],
    averageRating: 4.7,
    numReviews: 201
  },
  {
    name: 'Puma Hooded Sweatshirt',
    description: 'Stay warm and stylish with the Puma Essential Fleece Hoodie, combining athletic performance with urban streetwear appeal. Crafted from soft cotton-polyester fleece blend (80% cotton, 20% polyester) with brushed interior for exceptional warmth and comfort. Relaxed fit design allows easy layering over t-shirts while maintaining a modern silhouette. Attached hood with adjustable drawstring cords provides customizable coverage against wind and cold. Ribbed cuffs and hem seal in warmth and maintain shape. Large kangaroo-style front pocket keeps hands warm and stores essentials like phone and wallet. Embroidered Puma cat logo on chest showcases authentic branding. Pre-shrunk fabric resists shrinking after washing. Medium-weight 300 GSM material offers year-round versatility. Flat stitching throughout prevents chafing. Available in classic colors including black, gray, navy, and maroon. Machine washable in cold water with similar colors. Suitable for workouts, casual outings, lounging, or layering in colder months. Unisex design appeals to all ages.',
    price: 2499,
    imageURL: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    category: 'Fashion',
    stock: 120,
    brand: 'Puma',
    tags: ['hoodie', 'sweatshirt', 'casual', 'winter'],
    averageRating: 4.5,
    numReviews: 345
  },
  {
    name: 'Tommy Hilfiger Polo Shirt',
    description: 'Embrace preppy American style with the Tommy Hilfiger Classic Fit Polo Shirt, a wardrobe essential since 1985. Crafted from premium 100% cotton pique fabric with textured honeycomb weave that enhances breathability and creates refined aesthetic. Classic two-button placket with genuine mother-of-pearl buttons adds sophisticated detail. Ribbed polo collar and sleeve cuffs provide structure and traditional polo styling. Signature embroidered flag logo on left chest displays iconic Tommy branding. Straight hem with side vents allows comfortable movement and versatile styling - wear tucked or untucked. Regular fit through chest and body offers comfortable, non-restrictive wear. Pre-shrunk cotton maintains size and prevents shrinking. Colorfast dyes resist fading wash after wash. Available in seasonal color palette including navy, white, sky blue, and burgundy. Short sleeves with clean-finished edges. Tagless heat-seal label prevents neck irritation. Machine washable for easy care. Suitable for golf, tennis, casual Fridays, weekend brunches, or smart-casual occasions. Pairs perfectly with chinos, jeans, or shorts.',
    price: 3499,
    imageURL: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
    category: 'Fashion',
    stock: 70,
    brand: 'Tommy Hilfiger',
    tags: ['polo', 'shirt', 'casual', 'cotton'],
    averageRating: 4.6,
    numReviews: 267
  },
  {
    name: 'Calvin Klein Leather Belt',
    description: 'Complete your polished look with the Calvin Klein Reversible Leather Belt, offering two belts in one with sophisticated versatility. Premium full-grain leather construction ensures exceptional durability and develops rich character over time. Reversible design features smooth black leather on one side and brown leather on reverse, instantly transforming your style. Sleek brushed nickel buckle with engraved CK logo adds understated luxury. Buckle rotates 180 degrees for easy color switching. Belt width: 1.25 inches (32mm) - ideal for dress pants and jeans. Adjustable length accommodates waist sizes 30-44 inches. Five adjustment holes spaced 1 inch apart for precise fit. Edge stitching throughout enhances durability and refined appearance. Leather backing prevents belt from cracking or breaking. Suitable for business formal, smart casual, or everyday wear. Comes in premium Calvin Klein gift box perfect for presents. Easy care: wipe with damp cloth and condition occasionally. Backed by Calvin Klein quality guarantee.',
    price: 2999,
    imageURL: 'https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=500',
    category: 'Fashion',
    stock: 85,
    brand: 'Calvin Klein',
    tags: ['belt', 'leather', 'accessories', 'formal'],
    averageRating: 4.5,
    numReviews: 156
  },

  // Home & Kitchen (10 products)
  {
    name: 'Philips Air Fryer XXL',
    description: 'Revolutionize your cooking with the Philips Airfryer XXL featuring Rapid Air Technology that circulates superheated air to fry, bake, grill, and roast with up to 90% less fat than traditional frying. Extra-large 4.4-liter capacity basket feeds 4-6 people - perfect for family meals. Digital touchscreen with 7 pre-programmed settings: fries, chicken, fish, steak, cake, vegetables, and frozen snacks. Temperature range 60-200°C with precise control. 60-minute timer with auto-shutoff and ready signal. Removable non-stick coated basket and drawer are dishwasher safe for effortless cleanup. QuickClean basket with advanced non-stick coating reduces cleaning time by 50%. Fat removal technology separates and captures excess oil. Cooking booklet with 30+ recipes included. Rapid heating reduces preheating time. Cool-touch housing remains safe during operation. Power: 1500W for efficient cooking. Dimensions: 31.5 x 28.7 x 31.5 cm. Enjoy crispy French fries, golden chicken wings, tender salmon, and fluffy muffins - all healthier. 2-year warranty.',
    price: 14999,
    imageURL: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500',
    category: 'Home & Kitchen',
    stock: 40,
    brand: 'Philips',
    tags: ['air-fryer', 'kitchen', 'appliance', 'cooking'],
    averageRating: 4.7,
    numReviews: 289
  },
  {
    name: 'Prestige Pressure Cooker 5L',
    description: 'Cook delicious, nutritious meals in minutes with the Prestige Deluxe Plus Stainless Steel Pressure Cooker, a kitchen essential trusted by millions of Indian households. Premium Grade 304 stainless steel body with tri-ply bottom ensures even heat distribution and prevents hot spots. 5-liter capacity (serves 4-6 people) ideal for preparing rice, dal, curries, and meats. Unique pressure indicator rises when contents are under pressure for safe monitoring. Alpha base design with encapsulated aluminum core provides superior heat retention and works on all cooktops including induction. Controlled gasket-release system prevents pressure buildup. Precision weight valve regulates pressure automatically. Strong bakelite handles stay cool during cooking. Safety plug releases excess pressure if needed. Inner lid design prevents liquid overflow. Mirror finish exterior resists tarnishing and is easy to clean. Includes instruction manual with cooking time guide. 5-year warranty on manufacturing defects. Energy efficient - saves up to 70% cooking time and fuel. Compatible with gas, electric, ceramic, and halogen stovetops.',
    price: 2499,
    imageURL: 'https://images.unsplash.com/photo-1584990347449-39bcaa2c3164?w=500',
    category: 'Home & Kitchen',
    stock: 100,
    brand: 'Prestige',
    tags: ['pressure-cooker', 'kitchen', 'cookware'],
    averageRating: 4.6,
    numReviews: 567
  },
  {
    name: 'Dyson V15 Vacuum Cleaner',
    description: 'Experience the most powerful, intelligent cord-free vacuum with the Dyson V15 Detect, featuring laser illumination technology that reveals hidden dust on hard floors. Advanced Dyson Hyperdymium motor spins at 125,000 RPM generating 240AW of suction power. Laser Slim Fluffy cleaner head precisely detects and sizes microscopic dust particles. Acoustic piezo sensor automatically adjusts suction power based on dust levels. LCD screen displays real-time particle count and remaining runtime. High Torque cleaner head with DLS (Dynamic Load Sensor) technology deep cleans carpets and removes pet hair. Whole-machine HEPA filtration captures 99.99% of particles as small as 0.3 microns. Up to 60 minutes of fade-free runtime with click-in battery. Converts to handheld for cars, stairs, and upholstery. Includes: crevice tool, combination tool, hair screw tool, and wall-mounted dock. Bagless design with hygienic point-and-shoot bin emptying. Engineered for homes with pets and allergies. 2-year warranty.',
    price: 54999,
    imageURL: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500',
    category: 'Home & Kitchen',
    stock: 20,
    brand: 'Dyson',
    tags: ['vacuum', 'cleaner', 'cordless', 'home'],
    averageRating: 4.9,
    numReviews: 178
  },
  {
    name: 'IKEA Storage Organizer Set',
    description: 'Maximize your closet and living space with the IKEA SKUBB Storage Organizer 6-Piece Set, designed for efficient organization and space optimization. Durable polyester fabric construction with sturdy cardboard reinforcements maintains shape when filled. Set includes: three large boxes (44x55x19cm), two shoe boxes (22x34x16cm), and one box with compartments (44x34x11cm with 6 compartments). Perfect for storing clothes, shoes, accessories, toys, linens, and seasonal items. Fits perfectly in PAX wardrobes and KALLAX shelves. Integrated handles on sides enable easy pulling from high shelves. Foldable design collapses flat for space-saving storage when not in use. Mesh window on one side allows contents visibility. Neutral beige/white color coordinates with any decor. Machine washable at 40°C for easy cleaning. Helps maximize vertical space in closets and under beds. Compartment box ideal for socks, underwear, ties, and small accessories. Eco-friendly materials and production. Creates clutter-free, organized living spaces.',
    price: 1999,
    imageURL: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500',
    category: 'Home & Kitchen',
    stock: 150,
    brand: 'IKEA',
    tags: ['storage', 'organizer', 'home', 'boxes'],
    averageRating: 4.5,
    numReviews: 423
  },
  {
    name: 'Ninja Blender 1000W',
    description: 'Unleash your culinary creativity with the Ninja Professional 1000W Blender, engineered to pulverize ice, blend smoothies, and create gourmet soups with ease. Powerful 1000-watt motor delivers professional performance for crushing, blending, pureeing, and controlled processing. Total Crushing Technology combines unique blade design with powerful motor to crush through ice and frozen fruit in seconds. 72-ounce (2.1-liter) BPA-free pitcher perfect for large batches - ideal for family smoothies or party frozen drinks. Stacked blade assembly features six ultra-sharp stainless steel blades at different heights for optimal blending. Three manual speed settings plus pulse function provide precise control. Dishwasher-safe pitcher, lid, and blade assembly for hassle-free cleanup. Heavy-duty, stable base with suction-cup feet prevents movement during operation. Pour spout prevents dripping and mess. Includes recipe book with 50+ healthy smoothie, sauce, and soup recipes. Perfect for protein shakes, green smoothies, nut butters, baby food, and more. 2-year limited warranty.',
    price: 8999,
    imageURL: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500',
    category: 'Home & Kitchen',
    stock: 55,
    brand: 'Ninja',
    tags: ['blender', 'kitchen', 'appliance', 'smoothie'],
    averageRating: 4.7,
    numReviews: 312
  },
  {
    name: 'Milton Thermosteel Flask 1L',
    description: 'Keep your beverages at the perfect temperature for up to 24 hours with the Milton Thermosteel Duo DLX Vacuum Insulated Flask, India trusted premium brand for thermal solutions. Double-wall vacuum insulation technology creates an airless space between inner and outer walls, preventing heat transfer to keep contents hot or cold. 1-liter (1000ml) capacity serves 4-5 cups - perfect for family outings, office, or travel. Premium 18/8 food-grade stainless steel construction (inner and outer) ensures durability, prevents rust, and maintains beverage taste without metallic flavor. Leak-proof flip lid with push-button operation allows one-handed pouring. Wide mouth opening (3.5cm) enables easy filling, pouring, and cleaning, plus fits ice cubes. Copper coating on inner wall enhances temperature retention. Shock-resistant and shatter-proof - ideal for outdoor activities and rough handling. Easy-grip textured body prevents slipping. Lightweight design despite sturdy construction. BPA-free materials safe for all ages. Hand wash recommended for longevity. Available in elegant steel finish. Perfect for tea, coffee, water, soups, or cold beverages. 1-year warranty.',
    price: 899,
    imageURL: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'Home & Kitchen',
    stock: 200,
    brand: 'Milton',
    tags: ['flask', 'thermos', 'bottle', 'insulated'],
    averageRating: 4.6,
    numReviews: 789
  },
  {
    name: 'Hawkins Non-Stick Cookware Set',
    description: 'Transform your cooking experience with the Hawkins Futura Hard Anodised 7-Piece Non-Stick Cookware Set, combining superior heat distribution with effortless food release. Set includes: 1 kadai with lid (24cm), 1 fry pan (26cm), 1 tawa (25cm), 1 sauce pan with lid (18cm), and all matching glass lids. Hard-anodised aluminum construction provides exceptional strength - twice as hard as stainless steel and prevents warping. Premium 3-layer PFOA-free non-stick coating allows cooking with minimal oil for healthy meals. Flat, thick base ensures even heat distribution and prevents hot spots. Stay-cool handles with ergonomic design remain comfortable during cooking. Compatible with gas, electric, and ceramic cooktops (not induction). Tempered glass lids with steam vents enable monitoring without lifting. Non-stick surface prevents food from sticking, making cleaning effortless - just wipe with soft cloth. Metal-utensil safe with scratch-resistant coating. Energy efficient - cooks 25% faster than regular cookware. Complete set for all Indian cooking needs. 2-year warranty on manufacturing defects.',
    price: 5999,
    imageURL: 'https://images.unsplash.com/photo-1584990347449-39bcaa2c3164?w=500',
    category: 'Home & Kitchen',
    stock: 65,
    brand: 'Hawkins',
    tags: ['cookware', 'pans', 'kitchen', 'non-stick'],
    averageRating: 4.5,
    numReviews: 234
  },
  {
    name: 'Cello Water Bottle Set (6)',
    description: 'Stay hydrated throughout the day with the Cello Aqua Cool 6-Piece Water Bottle Set, combining vibrant colors with practical functionality for the whole family. Each bottle crafted from premium food-grade virgin plastic (BPA-free, non-toxic) ensures safety for daily use. 1-liter capacity per bottle perfect for school, office, gym, or outdoor activities. Set includes six assorted colors: red, blue, green, yellow, purple, and orange - easy identification for family members. Leak-proof flip-top cap with secure locking mechanism prevents spills in bags. Wide mouth opening (4cm) allows easy filling, adding ice cubes, and thorough cleaning. Ergonomic design with contoured grip prevents slipping from hands. Lightweight yet durable construction withstands daily wear and drops. Transparent body with measurement markings helps track water intake. Dishwasher safe for convenient cleaning. Odor-free and stain-resistant material maintains freshness. Suitable for water, juice, or sports drinks. Compact design fits most car cup holders and backpack pockets. Eco-friendly reusable alternative to disposable bottles.',
    price: 699,
    imageURL: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'Home & Kitchen',
    stock: 180,
    brand: 'Cello',
    tags: ['bottle', 'water', 'plastic', 'set'],
    averageRating: 4.4,
    numReviews: 567
  },
  {
    name: 'Borosil Microwave Safe Bowl Set',
    description: 'Discover versatile food storage with the Borosil Glass Bowl Set with Lids - 6 microwave-safe, oven-safe, and freezer-safe borosilicate glass bowls perfect for modern kitchens. Premium borosilicate glass withstands extreme temperature changes from -20°C to 350°C without cracking. Set includes three sizes: 2 small bowls (350ml), 2 medium bowls (500ml), and 2 large bowls (900ml) for varied storage needs. Airtight plastic lids with silicone seals lock in freshness and prevent leaks. Transparent glass allows easy content identification without opening. Non-porous glass surface doesn resist staining and odor absorption - curry, sauces, and strong foods wash clean. Microwave, oven, refrigerator, freezer, and dishwasher safe for ultimate convenience. Stackable design saves precious cabinet space. Perfect for meal prep, leftover storage, mixing ingredients, serving, and reheating. Eco-friendly reusable alternative to disposable containers. Lead-free, cadmium-free, and BPA-free materials ensure family safety. Durable construction for years of daily use. Ideal for Indian kitchens storing dal, rice, curries, chutneys, and snacks.',
    price: 1499,
    imageURL: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500',
    category: 'Home & Kitchen',
    stock: 90,
    brand: 'Borosil',
    tags: ['bowls', 'glass', 'microwave', 'kitchen'],
    averageRating: 4.7,
    numReviews: 345
  },
  {
    name: 'Bajaj Table Fan 400mm',
    description: 'Beat the heat with the Bajaj Bahar 400mm High-Speed Table Fan, delivering powerful airflow with whisper-quiet operation for home and office comfort. 400mm (16-inch) aerodynamically designed polymer blades push maximum air with minimal noise. Powerful 55-watt copper motor ensures long-lasting performance and energy efficiency. Three-speed settings (low, medium, high) provide customizable cooling comfort. 120-degree oscillation covers wider area for uniform air circulation throughout the room. Tilt-adjustable head with 5-position vertical angle adjustment directs airflow precisely where needed. Sturdy metal guard with elegant powder-coated finish ensures safety and durability. Wide thermoplastic base provides excellent stability on tables, desks, or floors. Overload protection with thermal cutout prevents motor burnout. Smooth-glide control knobs for easy speed selection. Air delivery: 65 CMM (cubic meters per minute) for effective cooling. Low power consumption suitable for continuous operation. ISI marked for quality assurance. Available in elegant white finish. Ideal for bedrooms, living rooms, offices, shops, and study rooms. 2-year warranty on product.',
    price: 1799,
    imageURL: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    category: 'Home & Kitchen',
    stock: 75,
    brand: 'Bajaj',
    tags: ['fan', 'cooling', 'home', 'appliance'],
    averageRating: 4.5,
    numReviews: 456
  },

  // Books (10 products)
  {
    name: 'Atomic Habits by James Clear',
    description: 'Transform your life one tiny change at a time with Atomic Habits, the groundbreaking international bestseller by James Clear with over 15 million copies sold worldwide. This revolutionary guide reveals the surprising power of small habits and how making tiny changes can lead to remarkable results. Clear draws on cutting-edge neuroscience, psychology, and real-world stories to explain why we fall into bad habits and how to build good ones that stick. Learn the Four Laws of Behavior Change - a simple framework for building better habits in any area of life. Discover how tiny improvements compound over time, how to design your environment for success, and why focusing on systems is more powerful than setting goals. Features actionable strategies for habit stacking, implementation intentions, and the 2-Minute Rule. Perfect for anyone seeking productivity improvement, health transformation, or personal growth. Paperback, 320 pages. Published by Penguin Random House. Clear, practical writing style makes complex concepts accessible. Includes diagrams, real-life examples, and proven techniques used by Olympic athletes, CEOs, and artists.',
    price: 599,
    imageURL: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    category: 'Books',
    stock: 150,
    brand: 'Penguin',
    tags: ['self-help', 'productivity', 'habits', 'bestseller'],
    averageRating: 4.9,
    numReviews: 1234
  },
  {
    name: 'The Psychology of Money',
    description: 'Unlock the secrets of wealth and happiness with The Psychology of Money by Morgan Housel, a Wall Street Journal bestseller that explores the strange ways people think about money. This isn timeless guide reveals that doing well with money has little to do with intelligence and everything to do with behavior. Through 19 short stories, Housel explains how people think about money and teaches you how to make better financial decisions. Learn why saving is more important than earning, how luck and risk shape our financial lives, and why wealth is what you don see. Discover the compounding power of patience, the psychology behind greed and fear, and why room for error is crucial in financial planning. Features real-life examples from history and contemporary finance. Covers topics like retirement planning, market volatility, lifestyle inflation, and generational wealth. Paperback, 256 pages. Published by Harriman House. Accessible writing style makes complex financial concepts understandable for everyone. Perfect for investors, young professionals, and anyone seeking financial independence and peace of mind.',
    price: 449,
    imageURL: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500',
    category: 'Books',
    stock: 120,
    brand: 'Harriman House',
    tags: ['finance', 'money', 'psychology', 'investing'],
    averageRating: 4.8,
    numReviews: 876
  },
  {
    name: 'Harry Potter Complete Set',
    description: 'Enter the magical world of Hogwarts with the Harry Potter Complete Box Set containing all seven enchanting books by J.K. Rowling - the beloved fantasy series that captivated billions worldwide. This collector edition includes: Philosopher Stone, Chamber of Secrets, Prisoner of Azkaban, Goblet of Fire, Order of the Phoenix, Half-Blood Prince, and Deathly Hallows. Follow Harry journey from orphaned boy living under the stairs to the wizard who conquered the Dark Lord. Experience friendship, bravery, love, and sacrifice through 4,224 pages of spellbinding storytelling. Features include: original cover artwork by Jonny Duddle, premium quality paper, and durable binding. Perfect for young readers aged 9+ and adults rediscovering childhood magic. Published by Bloomsbury. Set comes in beautiful collectible box perfect for gifting or display. Each book has been spell-checked and quality assured. Ideal for building reading habits in children, improving vocabulary, and sparking imagination. Join millions of Potterheads worldwide. Read about Quidditch matches, Patronus charms, Horcruxes, and epic wizard duels.',
    price: 3999,
    imageURL: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=500',
    category: 'Books',
    stock: 50,
    brand: 'Bloomsbury',
    tags: ['fiction', 'fantasy', 'series', 'children'],
    averageRating: 5.0,
    numReviews: 2345
  },
  {
    name: 'Sapiens by Yuval Noah Harari',
    description: 'Explore the extraordinary journey of humankind in Sapiens: A Brief History of Humankind by Yuval Noah Harari, an international phenomenon with over 21 million copies sold in 60 languages. This thought-provoking masterpiece traces Homo sapiens evolution from insignificant apes in East Africa to rulers of the world. Harari challenges everything we thought we knew about being human through three major revolutions: the Cognitive Revolution (70,000 years ago), the Agricultural Revolution (12,000 years ago), and the Scientific Revolution (500 years ago). Discover how myths and shared beliefs enabled humans to cooperate in large numbers, build cities, and create empires. Learn about the impact of money, religion, and empires on human society. Understand how capitalism, imperialism, and liberalism shaped modern world. Engaging narrative combines history, biology, philosophy, and economics. Paperback, 498 pages. Published by Harper. Provocative questions about our future: Will we destroy ourselves? What will replace Homo sapiens? Perfect for curious minds, history enthusiasts, and anyone pondering humanity place in the universe.',
    price: 699,
    imageURL: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500',
    category: 'Books',
    stock: 100,
    brand: 'Harper',
    tags: ['history', 'non-fiction', 'science', 'bestseller'],
    averageRating: 4.7,
    numReviews: 1567
  },
  {
    name: 'The Alchemist by Paulo Coelho',
    description: 'Embark on a life-changing journey with The Alchemist by Paulo Coelho, a modern classic that has inspired millions of readers across 80 languages to follow their dreams. This timeless tale follows Santiago, a young Andalusian shepherd boy who dreams of finding treasure near the Egyptian pyramids. When he meets a mysterious king who tells him about his Personal Legend, Santiago sells his sheep and embarks on a quest that takes him across deserts, into tribal wars, and through tests of faith. Along the way, he meets an Englishman seeking the Philosopher Stone, a beautiful woman at an oasis, and finally, the Alchemist himself who teaches profound lessons about listening to your heart and recognizing opportunity. Discover the Soul of the World, learn the Language of omens, and understand that when you want something, all the universe conspires to help you achieve it. Paperback, 208 pages. Published by HarperCollins. Philosophical storytelling blends adventure with spiritual wisdom. Perfect for seekers, dreamers, and anyone at a crossroads in life. A gift that inspires courage and self-discovery.',
    price: 349,
    imageURL: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500',
    category: 'Books',
    stock: 130,
    brand: 'HarperCollins',
    tags: ['fiction', 'philosophy', 'classic', 'bestseller'],
    averageRating: 4.8,
    numReviews: 2890
  },
  {
    name: 'Think and Grow Rich',
    description: 'Unlock the secrets of success with Think and Grow Rich by Napoleon Hill, the legendary success philosophy that has helped millions achieve wealth and personal fulfillment since 1937. Based on Hill 20-year study of over 500 self-made millionaires including Andrew Carnegie, Henry Ford, and Thomas Edison, this timeless classic reveals the 13 proven principles of riches. Learn the power of Desire, Faith, Autosuggestion, Specialized Knowledge, Imagination, Organized Planning, Decision, Persistence, the Master Mind, the Mystery of Sex Transmutation, the Subconscious Mind, the Brain, and the Sixth Sense. Discover how thoughts become things and how to harness the power of your mind to attract wealth. Features practical exercises and real-life success stories. Paperback, 320 pages. Published by Fingerprint Publishing. Written in an accessible, motivational style that resonates across generations. Perfect for entrepreneurs, sales professionals, students, and anyone committed to personal excellence. The book that inspired modern self-help movement. Transform your mindset from scarcity to abundance.',
    price: 299,
    imageURL: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500',
    category: 'Books',
    stock: 140,
    brand: 'Fingerprint',
    tags: ['self-help', 'success', 'business', 'classic'],
    averageRating: 4.6,
    numReviews: 987
  },
  {
    name: 'Rich Dad Poor Dad',
    description: 'Challenge everything you thought you knew about money with Rich Dad Poor Dad by Robert T. Kiyosaki, the #1 personal finance book of all time with over 40 million copies sold worldwide. This groundbreaking book shares the story of Kiyosaki two dads - his real father (Poor Dad) who was highly educated but financially struggled, and his best friend father (Rich Dad) who never finished school but became wealthy. Through their contrasting money philosophies, learn why the rich don work for money, the importance of financial education, the difference between assets and liabilities, and why your house is not an asset. Discover the CASHFLOW Quadrant, the power of passive income, and how to make money work for you instead of working for money. Features practical lessons on investing in real estate, stocks, and building businesses. Paperback, 336 pages. Published by Plata Publishing. Eye-opening insights challenge conventional wisdom about careers, education, and retirement. Perfect for young adults, parents teaching financial literacy, and anyone seeking financial freedom. The book that launched the Rich Dad brand and changed millions of financial futures.',
    price: 399,
    imageURL: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=500',
    category: 'Books',
    stock: 110,
    brand: 'Plata Publishing',
    tags: ['finance', 'money', 'investing', 'business'],
    averageRating: 4.7,
    numReviews: 1456
  },
  {
    name: 'Wings of Fire - APJ Abdul Kalam',
    description: 'Be inspired by the extraordinary journey of India Missile Man in Wings of Fire, the autobiography of Dr. APJ Abdul Kalam, former President of India and beloved People President. This inspiring memoir chronicles Kalam transformation from a boy selling newspapers in Rameswaram to becoming India most celebrated aerospace scientist and 11th President. Discover his childhood shaped by Hindu-Muslim harmony, his struggles to pursue higher education, his pivotal role in developing India ballistic missile and nuclear programs including Agni and Prithvi missiles, and his vision for transforming India into a developed nation by 2020. Learn about resilience, determination, and unwavering commitment to national service. Features behind-the-scenes accounts of India space program, ISRO, DRDO projects, and Pokhran nuclear tests. Co-authored with Arun Tiwari. Paperback, 196 pages. Published by Universities Press. Written in humble, accessible language that connects with readers of all ages. Perfect for students, young professionals, and anyone seeking motivation to overcome obstacles. A testament to the power of dreams, hard work, and integrity. India most-read autobiography.',
    price: 249,
    imageURL: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500',
    category: 'Books',
    stock: 160,
    brand: 'Universities Press',
    tags: ['biography', 'inspiration', 'india', 'autobiography'],
    averageRating: 4.9,
    numReviews: 3456
  },
  {
    name: 'The 7 Habits of Highly Effective People',
    description: 'Transform your personal and professional life with The 7 Habits of Highly Effective People by Stephen R. Covey, one of the most influential business books ever written with over 40 million copies sold in 50+ languages. This powerful guide presents a principle-centered approach for solving personal and professional problems through seven timeless habits: Be Proactive, Begin with the End in Mind, Put First Things First, Think Win-Win, Seek First to Understand Then to Be Understood, Synergize, and Sharpen the Saw. Learn the difference between being reactive and proactive, how to define your personal mission statement, and master time management through the Important-Urgent Matrix. Discover how to build interdependent relationships, practice empathic listening, and achieve creative cooperation. Features self-assessment tools and practical exercises. Paperback, 432 pages. Published by Simon & Schuster. Time-tested wisdom for character development and long-term success. Perfect for leaders, managers, students, and anyone committed to continuous improvement. The book that revolutionized self-help and leadership training worldwide.',
    price: 499,
    imageURL: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    category: 'Books',
    stock: 95,
    brand: 'Simon & Schuster',
    tags: ['self-help', 'productivity', 'leadership', 'bestseller'],
    averageRating: 4.8,
    numReviews: 1789
  },
  {
    name: 'The Power of Your Subconscious Mind',
    description: 'Unlock the incredible power within you with The Power of Your Subconscious Mind by Dr. Joseph Murphy, a groundbreaking classic that has helped millions harness their mind untapped potential since 1963. This transformative book reveals how your subconscious mind influences every aspect of your life - from health and relationships to wealth and success. Learn practical techniques to reprogram your subconscious mind through positive affirmations, visualization, and mental imagery. Discover how thoughts held in the subconscious mind manifest in reality, the healing power of prayer and meditation, and how to overcome fear, worry, and negative thinking. Features real-life examples of miraculous healings, financial breakthroughs, and relationship transformations achieved through subconscious reprogramming. Understand the scientific principles behind mind power and consciousness. Paperback, 312 pages. Published by Fingerprint Publishing. Timeless wisdom presented in clear, accessible language. Perfect for anyone seeking self-improvement, healing, prosperity, or spiritual growth. A must-read companion to The Secret, Think and Grow Rich, and As a Man Thinketh.',
    price: 199,
    imageURL: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500',
    category: 'Books',
    stock: 170,
    brand: 'Fingerprint',
    tags: ['self-help', 'psychology', 'mindfulness', 'classic'],
    averageRating: 4.7,
    numReviews: 2134
  },

  // Mobile & Accessories (10 products)
  {
    name: 'iPhone 15 Pro Max 256GB',
    description: 'Experience the pinnacle of smartphone innovation with the iPhone 15 Pro Max featuring aerospace-grade titanium design, the most advanced iPhone ever created. Powered by the revolutionary A17 Pro chip with 6-core CPU and 6-core GPU built on 3-nanometer process technology, delivering unprecedented performance for gaming, AR/VR, and professional workflows. Stunning 6.7-inch Super Retina XDR display with ProMotion technology (120Hz adaptive refresh rate) and Always-On display. Pro camera system includes 48MP Main camera with second-generation sensor-shift OIS, 12MP Ultra Wide, and 12MP 5x Telephoto for professional-grade photography and 4K ProRes video recording. New Action button replaces silent switch for customizable quick actions. USB-C connector with USB 3 speeds up to 10Gb/s. Ceramic Shield front, textured matte glass back. A17 Pro enables console-quality gaming with hardware-accelerated ray tracing. Up to 29 hours video playback. 5G connectivity, WiFi 6E, Ultra Wideband chip. Face ID, Emergency SOS via satellite, Crash Detection. Available in Natural Titanium, Blue Titanium, White Titanium, Black Titanium. Includes USB-C cable.',
    price: 159999,
    imageURL: 'https://images.unsplash.com/photo-1592286927505-2fd5de847c89?w=500',
    category: 'Mobile & Accessories',
    stock: 30,
    brand: 'Apple',
    tags: ['smartphone', 'iphone', 'mobile', '5g'],
    averageRating: 4.9,
    numReviews: 567
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Dominate your day with the Samsung Galaxy S24 Ultra, the ultimate Android flagship combining cutting-edge AI technology with unmatched versatility. Features the powerful Qualcomm Snapdragon 8 Gen 3 processor optimized for Galaxy, delivering blazing performance for multitasking, gaming, and AI applications. Stunning 6.8-inch Dynamic AMOLED 2X display with adaptive 120Hz refresh rate (1-120Hz) and peak brightness of 2,600 nits - the brightest smartphone screen ever. Quad camera system includes revolutionary 200MP wide camera with advanced AI processing, 12MP ultra-wide, 50MP periscope telephoto (5x optical zoom), and 10MP telephoto (3x optical zoom) - total 10x optical quality zoom. Built-in S Pen with Air Actions enables precise note-taking, photo editing, and gesture controls. Durable titanium frame with Corning Gorilla Armor glass. 12GB RAM, 256GB storage. All-day 5,000mAh battery with 45W super-fast charging. Galaxy AI features: Circle to Search, Live Translate, Note Assist, Photo Assist. IP68 water-dust resistance. Ultrasonic fingerprint sensor. Available in Titanium Gray, Titanium Black, Titanium Violet.',
    price: 134999,
    imageURL: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
    category: 'Mobile & Accessories',
    stock: 40,
    brand: 'Samsung',
    tags: ['smartphone', 'android', 'galaxy', '5g'],
    averageRating: 4.8,
    numReviews: 489
  },
  {
    name: 'OnePlus 12 5G',
    description: 'Experience flagship performance at an incredible value with the OnePlus 12 5G, the ultimate flagship killer featuring Qualcomm Snapdragon 8 Gen 3 processor that delivers desktop-class gaming and multitasking power. Stunning 6.82-inch 2K (3168x1440) AMOLED display with LTPO technology enables adaptive 1-120Hz refresh rate for buttery-smooth scrolling and gaming while conserving battery. ProXDR display with Dolby Vision reaches 4,500 nits peak brightness - perfect for outdoor visibility. Hasselblad-tuned triple camera system includes 50MP Sony LYT-808 main sensor with OIS, 48MP ultra-wide with 114° field of view, and 64MP periscope telephoto with 3x optical zoom. Capture stunning photos in any lighting with Multi-Directional PDAF and advanced computational photography. Massive 5,400mAh battery with 100W SUPERVOOC fast charging (1-100% in 26 minutes) and 50W wireless charging. 12GB LPDDR5X RAM, 256GB UFS 4.0 storage. Alert Slider for instant profile switching. Dual stereo speakers with Dolby Atmos. OxygenOS 14 based on Android 14. 5G, WiFi 7, Bluetooth 5.4. Glacial White and Flowy Emerald colors.',
    price: 64999,
    imageURL: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
    category: 'Mobile & Accessories',
    stock: 50,
    brand: 'OnePlus',
    tags: ['smartphone', 'oneplus', '5g', 'android'],
    averageRating: 4.7,
    numReviews: 678
  },
  {
    name: 'AirPods Pro 2nd Gen',
    description: 'Immerse yourself in exceptional sound with AirPods Pro (2nd Generation) featuring Apple breakthrough H2 chip that delivers richer bass and crystal-clear highs. Advanced Active Noise Cancellation is now 2x more effective at reducing unwanted noise, while Adaptive Transparency mode filters loud environmental sounds at 48,000 times per second. Personalized Spatial Audio with dynamic head tracking creates an immersive theater-like experience for music, movies, and calls. Customizable silicone ear tips (XS, S, M, L sizes) ensure comfortable, secure fit. Touch control on stem enables volume adjustment with swipe gestures. Up to 6 hours listening time with ANC on (30 hours total with MagSafe charging case). Precision Finding helps locate lost AirPods using U1 chip. IPX4 sweat and water resistant - perfect for workouts. Adaptive EQ automatically tunes music to your ear shape. Conversation Awareness lowers media volume when you start talking. Wireless charging case supports MagSafe, Qi, Apple Watch charger, and USB-C. Built-in lanyard loop. Seamless setup with all Apple devices. Hearing health features monitor sound exposure.',
    price: 24999,
    imageURL: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
    category: 'Mobile & Accessories',
    stock: 80,
    brand: 'Apple',
    tags: ['earbuds', 'wireless', 'airpods', 'audio'],
    averageRating: 4.8,
    numReviews: 890
  },
  {
    name: 'Anker PowerBank 20000mAh',
    description: 'Never run out of power with the Anker PowerCore Select 20000mAh High-Capacity Portable Charger, trusted by over 80 million users worldwide for reliable, fast charging on the go. Massive 20,000mAh battery capacity charges iPhone 13 approximately 4 times, Galaxy S22 over 3 times, or iPad mini 2 times - perfect for travel, camping, or emergencies. Dual USB-A output ports (2.4A each, 3A total) enable simultaneous charging of two devices at optimized speeds using PowerIQ and VoltageBoost technology. USB-C and Micro-USB input ports (both 2A) allow flexible recharging - fully recharge PowerBank in 6-7 hours. Premium Li-polymer battery cells provide superior energy density and safety. MultiProtect safety system includes surge protection, short circuit prevention, and temperature control. Trickle-charging mode charges low-power devices like earbuds and smartwatches. LED power indicator displays remaining battery with 4 dots. Compact size (158 x 74 x 19mm) and lightweight (343g) for portability. Durable matte finish resists scratches. Includes Micro-USB cable. 18-month warranty. Works with all USB-charged devices.',
    price: 2999,
    imageURL: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    category: 'Mobile & Accessories',
    stock: 120,
    brand: 'Anker',
    tags: ['powerbank', 'charger', 'portable', 'battery'],
    averageRating: 4.6,
    numReviews: 1234
  },
  {
    name: 'Spigen Tough Armor Case',
    description: 'Shield your smartphone with maximum protection using the Spigen Tough Armor Case, featuring military-grade MIL-STD 810G-516.6 drop protection and innovative Air Cushion Technology. Dual-layer construction combines flexible TPU inner casing that absorbs shocks with hard polycarbonate outer shell that deflects impacts. Reinforced Air Cushion corners contain specialized air pockets that compress during drops, dissipating impact force away from your device. Raised bezels protect camera lenses and screen from scratches when placed face-down. Precise cutouts ensure full access to all ports, buttons, wireless charging, and features without removing case. Tactile buttons with excellent feedback maintain responsive clicking. Spider-web pattern interior prevents watermarks and enhances grip. Slim profile (1.2mm thickness added) maintains pocket-friendly portability despite robust protection. Compatible with screen protectors and most third-party accessories. Easy snap-on installation with secure fit that will not loosen over time. Available for iPhone, Samsung Galaxy, and Google Pixel models. Backed by Spigen lifetime warranty. Perfect for active lifestyles, construction sites, outdoor adventures, or anyone seeking peace of mind. Certified drop-tested.',
    price: 1299,
    imageURL: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    category: 'Mobile & Accessories',
    stock: 200,
    brand: 'Spigen',
    tags: ['case', 'protection', 'cover', 'accessory'],
    averageRating: 4.7,
    numReviews: 567
  },
  {
    name: 'Belkin 3-in-1 Wireless Charger',
    description: 'Charge iPhone, AirPods, and Apple Watch simultaneously.',
    price: 7999,
    imageURL: 'https://images.unsplash.com/photo-1591290619762-0ec2f8b99636?w=500',
    category: 'Mobile & Accessories',
    stock: 60,
    brand: 'Belkin',
    tags: ['charger', 'wireless', '3-in-1', 'accessory'],
    averageRating: 4.6,
    numReviews: 345
  },
  {
    name: 'Xiaomi Redmi Note 13 Pro',
    description: 'Budget flagship with 108MP camera and 120W fast charging.',
    price: 24999,
    imageURL: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    category: 'Mobile & Accessories',
    stock: 70,
    brand: 'Xiaomi',
    tags: ['smartphone', 'redmi', 'budget', '5g'],
    averageRating: 4.5,
    numReviews: 789
  },
  {
    name: 'PopSocket Phone Grip',
    description: 'Expandable grip and stand for phones and tablets.',
    price: 399,
    imageURL: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    category: 'Mobile & Accessories',
    stock: 250,
    brand: 'PopSocket',
    tags: ['grip', 'stand', 'accessory', 'holder'],
    averageRating: 4.5,
    numReviews: 1890
  },
  {
    name: 'SanDisk 256GB MicroSD Card',
    description: 'Ultra-fast microSD card with A2 rating for apps and games.',
    price: 2499,
    imageURL: 'https://images.unsplash.com/photo-1626266061368-46a8f578ddd6?w=500',
    category: 'Mobile & Accessories',
    stock: 150,
    brand: 'SanDisk',
    tags: ['memory-card', 'storage', 'microsd', 'accessory'],
    averageRating: 4.7,
    numReviews: 678
  },

  // Sports & Toys (10 products)
  {
    name: 'Yonex Badminton Racket',
    description: 'Professional graphite badminton racket with isometric head shape.',
    price: 3499,
    imageURL: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500',
    category: 'Sports & Toys',
    stock: 50,
    brand: 'Yonex',
    tags: ['badminton', 'racket', 'sports', 'outdoor'],
    averageRating: 4.7,
    numReviews: 234
  },
  {
    name: 'Nivia Football Size 5',
    description: 'Professional PU leather football with excellent grip and durability.',
    price: 899,
    imageURL: 'https://images.unsplash.com/photo-1614632537423-1e6c2e836a2b?w=500',
    category: 'Sports & Toys',
    stock: 100,
    brand: 'Nivia',
    tags: ['football', 'soccer', 'sports', 'outdoor'],
    averageRating: 4.5,
    numReviews: 567
  },
  {
    name: 'LEGO Creator Expert Set',
    description: 'Advanced building set with 2000+ pieces for ages 12+.',
    price: 14999,
    imageURL: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500',
    category: 'Sports & Toys',
    stock: 40,
    brand: 'LEGO',
    tags: ['lego', 'building', 'toys', 'creative'],
    averageRating: 4.9,
    numReviews: 456
  },
  {
    name: 'Cosco Cricket Bat Kashmir Willow',
    description: 'Premium quality cricket bat with thick edges and sweet spot.',
    price: 2499,
    imageURL: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500',
    category: 'Sports & Toys',
    stock: 60,
    brand: 'Cosco',
    tags: ['cricket', 'bat', 'sports', 'outdoor'],
    averageRating: 4.6,
    numReviews: 345
  },
  {
    name: 'Hot Wheels Car Track Set',
    description: 'Exciting loop and crash track set with 2 die-cast cars.',
    price: 2999,
    imageURL: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500',
    category: 'Sports & Toys',
    stock: 80,
    brand: 'Hot Wheels',
    tags: ['toys', 'cars', 'track', 'kids'],
    averageRating: 4.7,
    numReviews: 789
  },
  {
    name: 'Barbie Dreamhouse Playset',
    description: 'Large dollhouse with 3 floors, 8 rooms, and 70+ accessories.',
    price: 12999,
    imageURL: 'https://images.unsplash.com/photo-1560582861-45078880e48e?w=500',
    category: 'Sports & Toys',
    stock: 30,
    brand: 'Barbie',
    tags: ['toys', 'dolls', 'barbie', 'kids'],
    averageRating: 4.8,
    numReviews: 567
  },
  {
    name: 'Decathlon Yoga Mat 8mm',
    description: 'Thick, non-slip yoga mat with carrying strap for exercise.',
    price: 1299,
    imageURL: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: 'Sports & Toys',
    stock: 90,
    brand: 'Decathlon',
    tags: ['yoga', 'mat', 'fitness', 'exercise'],
    averageRating: 4.6,
    numReviews: 678
  },
  {
    name: 'Hasbro Monopoly Board Game',
    description: 'Classic property trading game for family fun.',
    price: 1999,
    imageURL: 'https://images.unsplash.com/photo-1611891487427-a2b2e3f6de9c?w=500',
    category: 'Sports & Toys',
    stock: 70,
    brand: 'Hasbro',
    tags: ['board-game', 'monopoly', 'toys', 'family'],
    averageRating: 4.7,
    numReviews: 890
  },
  {
    name: 'Nerf Elite Blaster',
    description: 'Motorized dart blaster with 18-dart clip and rapid-fire action.',
    price: 3999,
    imageURL: 'https://images.unsplash.com/photo-1590845947670-c009801ffa74?w=500',
    category: 'Sports & Toys',
    stock: 55,
    brand: 'Nerf',
    tags: ['nerf', 'blaster', 'toys', 'outdoor'],
    averageRating: 4.8,
    numReviews: 456
  },
  {
    name: 'Remote Control Drone with Camera',
    description: 'Beginner-friendly drone with HD camera and altitude hold.',
    price: 5999,
    imageURL: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500',
    category: 'Sports & Toys',
    stock: 45,
    brand: 'Syma',
    tags: ['drone', 'rc', 'camera', 'toys'],
    averageRating: 4.5,
    numReviews: 345
  },

  // Health & Beauty (10 products)
  {
    name: 'Lakme Eyeconic Kajal',
    description: 'Smudge-proof kajal with intense black color that lasts 22 hours.',
    price: 299,
    imageURL: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=500',
    category: 'Health & Beauty',
    stock: 200,
    brand: 'Lakme',
    tags: ['kajal', 'makeup', 'cosmetics', 'eyes'],
    averageRating: 4.6,
    numReviews: 1234
  },
  {
    name: 'Himalaya Face Wash',
    description: 'Natural face wash with neem and turmeric for clear skin.',
    price: 149,
    imageURL: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
    category: 'Health & Beauty',
    stock: 250,
    brand: 'Himalaya',
    tags: ['facewash', 'skincare', 'natural', 'beauty'],
    averageRating: 4.5,
    numReviews: 2345
  },
  {
    name: 'L\'Oreal Paris Shampoo',
    description: 'Professional hair care shampoo with keratin for smooth hair.',
    price: 599,
    imageURL: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500',
    category: 'Health & Beauty',
    stock: 180,
    brand: 'L\'Oreal',
    tags: ['shampoo', 'haircare', 'beauty', 'keratin'],
    averageRating: 4.7,
    numReviews: 890
  },
  {
    name: 'Nivea Body Lotion 400ml',
    description: 'Deep moisture body lotion with vitamin E for soft skin.',
    price: 399,
    imageURL: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
    category: 'Health & Beauty',
    stock: 160,
    brand: 'Nivea',
    tags: ['lotion', 'moisturizer', 'skincare', 'body'],
    averageRating: 4.6,
    numReviews: 678
  },
  {
    name: 'Gillette Fusion Razor',
    description: 'Multi-blade razor with precision trimmer for close shave.',
    price: 799,
    imageURL: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500',
    category: 'Health & Beauty',
    stock: 140,
    brand: 'Gillette',
    tags: ['razor', 'shaving', 'grooming', 'men'],
    averageRating: 4.7,
    numReviews: 567
  },
  {
    name: 'Maybelline Lipstick Matte',
    description: 'Long-lasting matte lipstick with vibrant color and comfort.',
    price: 449,
    imageURL: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500',
    category: 'Health & Beauty',
    stock: 220,
    brand: 'Maybelline',
    tags: ['lipstick', 'makeup', 'matte', 'cosmetics'],
    averageRating: 4.6,
    numReviews: 1567
  },
  {
    name: 'Neutrogena Sunscreen SPF 50+',
    description: 'Broad spectrum sun protection with lightweight formula.',
    price: 699,
    imageURL: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
    category: 'Health & Beauty',
    stock: 130,
    brand: 'Neutrogena',
    tags: ['sunscreen', 'skincare', 'spf', 'protection'],
    averageRating: 4.8,
    numReviews: 456
  },
  {
    name: 'Garnier Face Serum Vitamin C',
    description: 'Brightening face serum with vitamin C for glowing skin.',
    price: 549,
    imageURL: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
    category: 'Health & Beauty',
    stock: 110,
    brand: 'Garnier',
    tags: ['serum', 'vitamin-c', 'skincare', 'brightening'],
    averageRating: 4.7,
    numReviews: 789
  },
  {
    name: 'Dove Soap Bar Pack of 4',
    description: 'Moisturizing beauty bar with 1/4 moisturizing cream.',
    price: 299,
    imageURL: 'https://images.unsplash.com/photo-1622547991232-d1c7e3b4e31f?w=500',
    category: 'Health & Beauty',
    stock: 190,
    brand: 'Dove',
    tags: ['soap', 'bath', 'skincare', 'moisturizing'],
    averageRating: 4.6,
    numReviews: 2134
  },
  {
    name: 'Oral-B Electric Toothbrush',
    description: 'Rechargeable electric toothbrush with pressure sensor.',
    price: 2999,
    imageURL: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500',
    category: 'Health & Beauty',
    stock: 75,
    brand: 'Oral-B',
    tags: ['toothbrush', 'electric', 'dental', 'oral-care'],
    averageRating: 4.8,
    numReviews: 345
  },

  // Baby Products (10 products)
  {
    name: 'Pampers Baby Diapers Large',
    description: 'Ultra-soft diapers with 12-hour leakage protection.',
    price: 1499,
    imageURL: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
    category: 'Baby Products',
    stock: 100,
    brand: 'Pampers',
    tags: ['diapers', 'baby', 'newborn', 'essentials'],
    averageRating: 4.7,
    numReviews: 3456
  },
  {
    name: 'Johnson\'s Baby Shampoo',
    description: 'No more tears formula, gentle and mild for baby\'s delicate hair.',
    price: 249,
    imageURL: 'https://images.unsplash.com/photo-1584706865145-67ba4e7c9f2f?w=500',
    category: 'Baby Products',
    stock: 180,
    brand: 'Johnson\'s',
    tags: ['shampoo', 'baby', 'bath', 'hair'],
    averageRating: 4.8,
    numReviews: 2890
  },
  {
    name: 'Chicco Baby Feeding Bottle',
    description: 'Anti-colic bottle with natural feel teat, BPA-free.',
    price: 599,
    imageURL: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
    category: 'Baby Products',
    stock: 120,
    brand: 'Chicco',
    tags: ['bottle', 'feeding', 'baby', 'anti-colic'],
    averageRating: 4.6,
    numReviews: 1234
  },
  {
    name: 'MeeMee Baby Wet Wipes',
    description: 'Soft and gentle wipes with aloe vera, pack of 3 (240 wipes).',
    price: 399,
    imageURL: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500',
    category: 'Baby Products',
    stock: 200,
    brand: 'MeeMee',
    tags: ['wipes', 'baby', 'cleaning', 'hygiene'],
    averageRating: 4.5,
    numReviews: 4567
  },
  {
    name: 'Graco Baby Stroller',
    description: 'Lightweight stroller with 3-point harness and reclining seat.',
    price: 8999,
    imageURL: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
    category: 'Baby Products',
    stock: 30,
    brand: 'Graco',
    tags: ['stroller', 'pram', 'baby', 'transport'],
    averageRating: 4.7,
    numReviews: 567
  },
  {
    name: 'Fisher-Price Baby Rocker',
    description: 'Calming vibrations and music, perfect for newborns.',
    price: 4999,
    imageURL: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
    category: 'Baby Products',
    stock: 45,
    brand: 'Fisher-Price',
    tags: ['rocker', 'bouncer', 'baby', 'toys'],
    averageRating: 4.8,
    numReviews: 789
  },
  {
    name: 'Himalaya Baby Lotion',
    description: 'Natural baby lotion with olive oil and almond oil.',
    price: 199,
    imageURL: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
    category: 'Baby Products',
    stock: 150,
    brand: 'Himalaya',
    tags: ['lotion', 'baby', 'skincare', 'natural'],
    averageRating: 4.7,
    numReviews: 1890
  },
  {
    name: 'Mee Mee Baby Thermometer',
    description: 'Digital thermometer with fast 10-second reading.',
    price: 299,
    imageURL: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=500',
    category: 'Baby Products',
    stock: 100,
    brand: 'MeeMee',
    tags: ['thermometer', 'baby', 'health', 'digital'],
    averageRating: 4.5,
    numReviews: 456
  },
  {
    name: 'Pigeon Baby Soap',
    description: 'Gentle care for your baby delicate skin with Pigeon Baby Soap enriched with natural chamomile extracts. This mild, pH-balanced formula is specifically designed for newborns and infants with sensitive skin. Chamomile soothes and calms irritation while maintaining natural moisture. Hypoallergenic and dermatologically tested to be gentle on baby eyes and skin. Free from parabens, phthalates, artificial colors, and harsh chemicals. Creates rich, creamy lather that rinses easily without residue. Glycerin-based formula prevents dryness and keeps skin soft and supple. Mild fragrance suitable for daily bathing. Each 75g bar lasts approximately 2-3 weeks with regular use. Trusted by pediatricians and mothers worldwide. Perfect for newborns, infants, and toddlers. Can also be used for children with eczema-prone or allergy-sensitive skin.',
    price: 99,
    imageURL: 'https://images.unsplash.com/photo-1584706865145-67ba4e7c9f2f?w=500',
    category: 'Baby Products',
    stock: 220,
    brand: 'Pigeon',
    tags: ['soap', 'baby', 'bath', 'gentle'],
    averageRating: 4.6,
    numReviews: 3234
  },
  {
    name: 'Baby Einstein Activity Gym',
    description: 'Playmat with music, lights, and hanging toys for development.',
    price: 3999,
    imageURL: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
    category: 'Baby Products',
    stock: 50,
    brand: 'Baby Einstein',
    tags: ['playmat', 'toys', 'baby', 'activity'],
    averageRating: 4.8,
    numReviews: 678
  }
];

// Connect to MongoDB and seed products
const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Delete existing products (optional - comment out if you want to keep existing)
    // await Product.deleteMany({});
    // console.log('🗑️  Cleared existing products');

    // Insert products
    const insertedProducts = await Product.insertMany(products);
    
    console.log('\n✅ Products seeded successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📦 Total Products Added: ${insertedProducts.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Count by category
    const categoryCounts = {};
    insertedProducts.forEach(product => {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    });

    console.log('\n📊 Products by Category:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} products`);
    });

    console.log('\n🎉 Database is ready with products!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
