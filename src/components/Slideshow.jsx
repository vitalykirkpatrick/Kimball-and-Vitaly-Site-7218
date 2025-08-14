import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import ImageModal from './ImageModal';
import * as FiIcons from 'react-icons/fi';

const { FiChevronLeft, FiChevronRight, FiCalendar, FiBookOpen, FiVolume2, FiList, FiGrid, FiInfo, FiX, FiArrowRight } = FiIcons;

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalSlideIndex, setModalSlideIndex] = useState(0);
  const sliderRef = useRef(null);
  const timelineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [mobileViewMode, setMobileViewMode] = useState('card'); // 'card', 'grid', or 'list'
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const slideContentRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Function to handle image load errors and fix file extensions if needed
  const handleImageError = (slideId) => {
    const slide = slides.find(s => s.id === slideId);
    if (!slide) return;

    // Try to fix the extension by toggling between jpg and JPG
    if (slide.image.toLowerCase().endsWith('.jpg')) {
      // Try with uppercase extension
      const newImage = slide.image.slice(0, -4) + '.JPG';
      // Update the slide's image URL
      const updatedSlides = slides.map(s => s.id === slideId ? { ...s, image: newImage } : s);
      // Update slides array
      setSlides(updatedSlides);
    } else if (slide.image.toLowerCase().endsWith('.jpeg')) {
      // Try with jpg extension
      const newImage = slide.image.slice(0, -5) + '.jpg';
      // Update the slide's image URL
      const updatedSlides = slides.map(s => s.id === slideId ? { ...s, image: newImage } : s);
      // Update slides array
      setSlides(updatedSlides);
    } else if (slide.image.toLowerCase().endsWith('.png')) {
      // Try with jpg extension
      const newImage = slide.image.slice(0, -4) + '.jpg';
      // Update the slide's image URL
      const updatedSlides = slides.map(s => s.id === slideId ? { ...s, image: newImage } : s);
      // Update slides array
      setSlides(updatedSlides);
    }
  };

  // Function to handle image load success
  const handleImageLoad = (slideId) => {
    setImagesLoaded(prev => ({ ...prev, [slideId]: true }));
  };

  // Preload images for faster rendering
  useEffect(() => {
    const preloadImages = () => {
      setIsLoading(true);
      // Create an array to track loaded images
      const imagePromises = slides.map(slide => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = () => {
            handleImageLoad(slide.id);
            resolve();
          };
          img.onerror = () => {
            handleImageError(slide.id);
            // Still resolve so we don't block the loading process
            resolve();
          };
        });
      });
      
      // When all images are loaded or have attempted to load
      Promise.all(imagePromises).then(() => {
        setIsLoading(false);
      });
    };
    
    preloadImages();
  }, []);

  // Updated slideshow items with fixed image extensions and added citizenship slide
  const [slides, setSlides] = useState([
    {
      id: 2,
      date: "May 2006",
      title: "First $1 Movie Date",
      description: "We met online—two careful messages turned into a late-night chat—and took it offline at the $1 theater. Kimball swears he fell in love with my laugh somewhere between the previews and the plot; the ticket was cheap, the chemistry instant.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/May_2006_First_1_Dollar_Movie_Date.JPG",
      year: 2006
    },
    {
      id: 3,
      date: "August 2006",
      title: "Moving In Together (Sort Of)",
      description: "While Kimball was off in Colorado for the summer, I moved into the basement room next to his at 746 E 30 N in Orem—like a very polite house ghost who paid rent. When he came back, we made it official: shared keys, shared Wi-Fi, and a peace treaty over fridge shelves.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/August_2006_Moving_In_Together_Sort_Of.JPG",
      year: 2006
    },
    {
      id: 4,
      date: "October 2007",
      title: "First Townhome (Orem)",
      description: "1174 W 230 S—keys, boxes, and the thrilling discovery that everything breaks on weekends. It was a huge step for me as an immigrant on an H-1B visa.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/October_2007_First_Townhome_Orem.JPG",
      year: 2007
    },
    {
      id: 5,
      date: "February 2008",
      title: "The Proposal",
      description: "I opened the door to a runway of candles up the stairs into the main room—balloons everywhere, the whole place glowing like a rom-com finale—and a table set with food Kimball actually cooked (yes, cooked). He asked; I said yes before the chocolate could melt and the smoke alarm could register its surprise.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/February_2008_The_Proposal.jpg",
      year: 2008
    },
    {
      id: 6,
      date: "August 15, 2008",
      title: "San Diego Wedding",
      description: "Ocean breeze, big promises, and the best kind of forever. We held our commitment ceremony surrounded by chosen family and love.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/August_15_2008_San_Diego_Wedding.jpg",
      year: 2008
    },
    {
      id: 7,
      date: "April 2009",
      title: "Computer Science Degree",
      description: "Graduating with my Computer Science degree - proof that determination, caffeine, and a supportive husband can overcome language barriers and impossible coding assignments.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/April_2009_Computer_Science_Degree.JPG",
      year: 2009
    },
    {
      id: 8,
      date: "May 2009",
      title: "Universal Orlando, SeaWorld & Cocoa Beach",
      description: "Full Florida mode: Men in Black laser duels (Kimball's suspiciously elite aim), Jurassic Park–soaked, and peak orca selfies. Cocoa Beach added Vitaly's cartwheels, my towel-burrito look, and \"training\" in matching yellow shirts—synchronized curls=love.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/May_2009_Universal_Orlando_SeaWorld_and_Cocoa_Beach.JPG",
      year: 2009
    },
    {
      id: 9,
      date: "August 2010",
      title: "Timeshare \"Exit\" Attempt",
      description: "Paid a $1,450 \"marketing fee\" to a \"we'll sell it in 90 days\" outfit; five months later, no check—just a masterclass in fraud spotting and a firm never-again.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/August_2010_Timeshare_Exit_Attempt.jpg",
      year: 2010
    },
    {
      id: 10,
      date: "2011",
      title: "The Barber Shop \"Investment\"",
      description: "I wired $19,152 to Masha's Kyiv salon; within weeks came \"emergencies\"—inspectors, landlord drama, and daily pleas for more. Alex checked: open door, 80₴ cuts, zero customers; we even stalled with a \"hospital\" excuse. Cash stopped, Masha vanished—lesson learned: love needs receipts.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/2011_The_Barber_Shop_Investment.jpg",
      year: 2011
    },
    {
      id: 11,
      date: "September 2011",
      title: "San Francisco Exploration",
      description: "Our first San Francisco adventure featured Alcatraz (where Kimball suspiciously knew too much about the escape routes), Ghirardelli chocolate (where I set a personal record for samples), and the Golden Gate Bridge (where we pretended to understand the engineering while taking selfies).",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/September_2011_San_Francisco_Exploration.jpg",
      year: 2011
    },
    {
      id: 12,
      date: "September 2012",
      title: "Timpanogos Mountain Quest",
      description: "We tackled Timpanogos believing Kimball's \"just four hours\" hiking wisdom, but nine hours and four waterfalls later, I was still carrying all the gear while Kimball was out of breath—so much for his famous first-kiss breathing lesson. (Turns out, neither Google nor romance prepares you for hauling snacks and a boyfriend up a mountain.)",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/September_2012_Timpanogos_Mountain_Quest.JPG",
      year: 2012
    },
    {
      id: 13,
      date: "December 2012",
      title: "Zion National Park",
      description: "We swapped tinsel for red rock, studied the giant canyon map like treasure hunters, then got a free mist facial at Weeping Rock and practiced chain-assisted ledge hugging. Holiday cardio: sandstone cathedrals, happy quads, and at least twelve heroic jump photos.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/December_2012_Zion_National_Park.JPG",
      year: 2012
    },
    {
      id: 14,
      date: "June 2013",
      title: "After DOMA — Operation \"We're Finally Eligible\"",
      description: "A news alert pinged—DOMA down. Ten minutes later we were at FedEx turning love into a three-ring binder: I-130 checklists, passport photos, and enough evidence to crash a stapler. The postal clerk weighed our packet like a newborn, we toasted with grocery-store cupcakes, and renamed the spreadsheet \"Green Card, Baby.\"",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/June_2013_After_DOMA_Operation_Were_Finally_Eligible.jpg",
      year: 2013
    },
    {
      id: 15,
      date: "July 2013",
      title: "Family Reunion in Colorado",
      description: "We survived a classic Mormon family reunion in Colorado with Kimball's clan—roughly the size (and volume) of a BYU freshman orientation. There were cousins galore, Jell-O salads in neon shades, and enough family photos to qualify as cardio. I lost count of the blonde children somewhere between the blessing on the food and our six-hour round of Mormon Uno.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/July_2013_Family_Reunion_in_Colorado.jpg",
      year: 2013
    },
    {
      id: 16,
      date: "November 2013",
      title: "First Trip to NYC — Times Square, Central Park & Lady Liberty",
      description: "Neon baptism in Times Square, fall-color struts through Central Park, and a quiet hand-hold at the 9/11 Memorial. We high-fived Lady Liberty from the ferry, tested the Wall Street bull's confidence, and learned the subway beats arguing over the map—thanks to our friend Kary, our fairy godparent and guide.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/November_2013_First_Trip_to_NYC_Times_Square_Central_Park_and_Lady_Liberty.JPG",
      year: 2013
    },
    {
      id: 17,
      date: "April 2014",
      title: "Vitaly in Russia",
      description: "Visiting Russia in 2014 as a Ukrainian felt a bit like sneaking a borscht recipe past border patrol—equal parts gutsy, curious, and hoping nobody asked too many questions. I stood by the Kremlin, arms crossed, practicing my best \"just a tourist\" smile while the Dnipro and Moscow rivers argued in my DNA.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/April_2014_Vitaly_in_Russia.jpg",
      year: 2014
    },
    {
      id: 18,
      date: "May 2015",
      title: "Career Jump: MOXTEK → FOSS",
      description: "Nine years into MOXTEK, I got recruited into FOSS and basically did a Minnesota audition with a 'first 100 days' homework packet. I swapped x-ray components for capital equipment—NIR/FT-IR analyzers—and a bigger map (hi, Portland… also Alaska and Hawaii). First day: May 18, 2015. Biggest upgrade since discovering espresso: new industry, bigger tickets, and proof I wasn't the \"kid\" at MOXTEK anymore—just a very caffeinated Regional Sales Manager.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/May_2015_Career_Change_MOXTEK_to_FOSS.jpg",
      year: 2015
    },
    {
      id: 19,
      date: "May 2015",
      title: "Tokyo & Kyoto",
      description: "We navigated by Suica beep, ate heroic noodles, and saluted the world's politest toilets. Shinkansen to Kyoto for bamboo and torii, then back to Shinjuku's Robot Restaurant for neon dinosaurs—thanks to Kary, our fairy godparent, for making it all magic.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/May_2015_Tokyo_and_Kyoto.jpg",
      year: 2015
    },
    {
      id: 20,
      date: "June 26, 2015",
      title: "Marriage Equality Nationwide",
      description: "Obergefell made it official coast-to-coast—our California \"I do\" now spoke fluent federal. We celebrated with cake and excessive screenshotting of the headline.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/June_26_2015_Marriage_Equality_Nationwide.jpg",
      year: 2015
    },
    {
      id: 21,
      date: "October 2015",
      title: "Pacific Northwest Loop",
      description: "Portland fed us Voodoo Doughnuts and pho by the river, plus a romantic park seesaw and hotel ice-cream-in-bed (five-star=two spoons). Bend gave us a brewery tour where we tried to sample \"responsibly\" (we failed adorably). Seattle wrapped it up with Pike Place fish gawking, the Great Wheel, and Space Needle selfies—proof we can thrive on caffeine, carbs, and clouds.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/October_2015_Pacific_Northwest_Loop.jpg",
      year: 2015
    },
    {
      id: 22,
      date: "April 2016",
      title: "First Startup Pitch — Get Seeded at the U",
      description: "Three minutes, zero animations, and a Q&A that felt like speed-dating with judges. We left with seed money pending, a newborn prototype, and—by September—an invite to show at CES 2017. Turns out \"scrappy and caffeinated\" plays well in Vegas.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/April_2016_First_Startup_Pitch_Get_Seeded_at_the_U.jpg",
      year: 2016
    },
    {
      id: 23,
      date: "October 2017",
      title: "U.S. Citizenship Day",
      description: "After years of forms thicker than Tolstoy, I raised a tiny flag like it could pick up Wi-Fi, swore the oath, and officially became a U.S. citizen. I grinned so hard the certificate tried to curl, practiced my new powers—voting, correcting people that it's \"Ukraine,\" not \"the Ukraine,\" and saying \"y'all\" at TSA—and learned citizenship comes with two bonus features: jury-duty invitations and unlimited Costco samples. Green card retired; swagger upgraded.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Kimball+and+Vitaly+Website+Content/October_2017_Vitaly_Received_Citizenship.jpg",
      year: 2017
    },
    {
      id: 24,
      date: "September 2017",
      title: "Denmark — Copenhagen & Roskilde",
      description: "Canal cruise past the Black Diamond and Opera House, street-food feasts, a calf-burning spiral climb up Our Saviour's Church, Viking ships in Roskilde, and \"research-grade\" ice cream at Frederiksborg.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/September_2017_Denmark_Copenhagen_and_Roskilde.jpg",
      year: 2017
    },
    {
      id: 25,
      date: "January 2018",
      title: "CES — CloviFi's Big Vegas Glow-Up",
      description: "We hauled our tiny Wi-Fi TV-audio puck to Vegas, took victory selfies in the Innovation Awards Showcase, and left as CES 2018 Innovation Awards Honorees in High-Performance Home A/V (aka: stream TV sound to your phone without bugging the room).",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/January_2018_CES_CloviFi_Big_Vegas_Glow_Up.jpg",
      year: 2018
    },
    {
      id: 26,
      date: "Dec 29, 2018 – Jan 5, 2019",
      title: "First Carnival Cruise (NYE on the Vista)",
      description: "Sailed from New Orleans and rang in 2019 at a shoulder-to-shoulder deck party under confetti and fireworks. Ports of call: Roatán's West Bay (macaws on arms, cheeky monkeys, kayak selfies), Belize (tender in, river ride and climb on Mayan ruins—leg day, delivered), and Cozumel (infinity-pool day pass, snorkel splashes, taquitos as recovery fuel). Between stops we collected sunrises, soft-serve, and memories.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/Dec_29_2018_to_Jan_5_2019_First_Carnival_Cruise_NYE_on_the_Vista.jpg",
      year: 2019
    },
    {
      id: 27,
      date: "March 2019",
      title: "Mexico \"Work\" Trip (San José del Cabo)",
      description: "We flew south for an off-site that suspiciously looked like vacation: slide decks, budget-achiever certificates, and approximately one billion tacos. Days=strategy and presentations; nights=pool-table playoffs, karaoke diplomacy, and dance-floor networking. We squeezed in beach football and wave sprints, called the oceanfront \"Conference Room B,\" and tried to expense SPF. Productivity: high. Tan lines: measurable.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/March_2019_Mexico_Work_Trip_San_Jose_del_Cabo.jpg",
      year: 2019
    },
    {
      id: 28,
      date: "June 15, 2019",
      title: "NPC SLC Men's Physique",
      description: "Walked onstage with nothing but a spray-tan, board shorts, and a posing routine taught by my bathroom mirror—and still landed hardware: Masters 35+ 3rd, True Novice 5th, Novice A 8th. (first show, no coach!) Why it worked: stubborn consistency, clean prep, and learning to flare lats on command. Proof you don't need a guru—just grit, practice, and a smile that can hold a front-pose.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/June_15_2019_NPC_SLC_Mens_Physique.jpg",
      year: 2019
    },
    {
      id: 29,
      date: "Nov 2019",
      title: "Baja California (Catalina + Ensenada)",
      description: "Sailed from Long Beach; Avalon for sun and harbor struts with surfboards we didn't surf. Ensenada=tacos, glittery ship shows, and a flaming-dessert moment. Wrapped at the Long Beach Aquarium—high-fived rays, eyeballed sharks, got side-eye from an octopus; sunsets, snacks, and ~400 selfies.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/Nov_2019_Baja_California_Catalina_and_Ensenada.jpg",
      year: 2019
    },
    {
      id: 30,
      date: "March 2020",
      title: "Hard Reset",
      description: "Filed the police report after a $47K \"job\" con—$27K wired Jan 15 + $20K in bitcoin; the $30K \"refund\" check bounced. Takeaway: always check the reply-to, and never let my 401(k) be the ATM again.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/March_2020_Hard_Reset.jpg",
      year: 2020
    },
    {
      id: 31,
      date: "May 2020",
      title: "PerkinElmer Era Begins",
      description: "Joined PerkinElmer as a Senior Technical Sales Specialist (remote, Pacific Northwest), selling analytical instruments + cloud services to food/ag and public-sector labs—topped $1M in year one. The fridge stopped hiding behind the kale.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/May_2020_PerkinElmer_Era_Begins.jpg",
      year: 2020
    },
    {
      id: 32,
      date: "February 11, 2022",
      title: "First Memoir Published",
      description: "VITALY hit paperback—my first book! Huge thanks to my friend Linda Forrest for co-piloting and taming my commas; the printer exhaled and so did I.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/February_11_2022_First_Memoir_Published.JPG",
      year: 2022
    },
    {
      id: 33,
      date: "Summer 2022",
      title: "The $70.7k \"No Withdrawals\" Caper",
      description: "A Facebook \"pro trader\" lured me into a sketchy BYBIT app; deposits flew in, withdrawals didn't, and \"support\" (via Gmail, of course) demanded a mysterious \"bond\"—translation: my money took a vacation without me, and I came home with a sharper scam radar.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/Summer_2022_The_70k_No_Withdrawals_Caper.jpg",
      year: 2022
    },
    {
      id: 34,
      date: "Oct 2022",
      title: "Wasatch \"Survival Skills\"",
      description: "Kimball: \"No matches needed—I'll start it without fire… with a torch and a sling.\" Two hours of smoky mime later, Vitaly spots a lighter under the cooler and has flames in 47 seconds. Moral: the tool you need is usually right in front of your face. I kept my eyes open—and my s'mores ready.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/Oct_2022_Wasatch_Survival_Skills.jpg",
      year: 2022
    },
    {
      id: 35,
      date: "Jan 2023",
      title: "Dominican Republic Family Visit",
      description: "Santiago → Jarabacoa → Sosúa with Lee, Rosa, and crew: pools, vistas, a million cousins, and horses that only took pesos. Highlight (or lowlight): I (Vitaly) hit an ATV \"dip\" at rally speed, launched us, and gave Kimball and me matching bruise souvenirs. Cured with chinola juice, ocean swims, and family hugs. Next time: slower throttle, bigger helmet.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/Jan_2023_Dominican_Republic_Family_Visit.jpg",
      year: 2023
    },
    {
      id: 36,
      date: "June 2023",
      title: "Denver Pride (Road-Trip Edition)",
      description: "UT → Billings, MT → Sheridan, WY → Denver: sunrise drives, diner fuel, sunset skies, and dashboard karaoke. Pride day=kilt + rainbow scarf, flexing for selfies, dancing along the parade, handing out/hoarding street treats, hugging friends, and photobombing floats. Four states, three playlists, zero shame—maximum glitter.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/June_2023_Denver_Pride_Road_Trip_Edition.jpg",
      year: 2023
    },
    {
      id: 37,
      date: "2023",
      title: "The Great Animal Scam (Attempts, Plural)",
      description: "Every \"free\" pet turned out to cost a small fortune. We settled for stuffed animals and sanity.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/2023_The_Great_Animal_Scam.jpg",
      year: 2023
    },
    {
      id: 38,
      date: "January 2024",
      title: "Virgin Islands Cruise",
      description: "St. Thomas served up cable-car views at Paradise Point, deck workouts, and hibachi theatrics that singed our eyebrows (in a good way). We danced through glow-parties, posed on every rail with that blue-on-blue backdrop, and tendered to Great Stirrup Cay for beach naps and brag-worthy selfies. Returned sun-kissed, salt-cured, and proudly powered by soft-serve.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/January_2024_Virgin_Islands_Cruise.jpg",
      year: 2024
    },
    {
      id: 39,
      date: "Oct 2024",
      title: "NPC Utah Classic Physique",
      description: "After a two-month turbo prep (brief help from a nutrition coach, then I built my own diet), plus a two-week posing bootcamp, I walked onstage and left with 1st in Classic Physique Novice, 1st in Classic Physique Masters 35+, and 2nd in the Open class—a glow-up from last time's 3rd and 5th in Men's Physique. Turns out winning is a recipe: eat like a scientist, train like a mule, pose like a peacock, sleep like a cat, and save the donuts for the trophy photos.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/Oct_2024_NPC_Utah_Classic_Physique.jpg",
      year: 2024
    },
    {
      id: 40,
      date: "Nov–Dec 2024",
      title: "Birthday Bash & West Coast Holiday Loop",
      description: "November: Vegas for my birthday—Kimball treated me to the Sphere and a stack of shows; best gift, zero wrapping. December: I flipped the script and bankrolled a 12-day joyride—Vegas → San Diego → L.A. → Palm Springs → back to Vegas → Utah. He got Christmas, I got airline miles, and we both got legends.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/Nov_Dec_2024_Birthday_Bash_and_West_Coast_Holiday_Loop.jpg",
      year: 2024
    },
    {
      id: 41,
      date: "May 15 & Aug 15, 2026",
      title: "20 Years Together; 18 Married",
      description: "Two milestones, one love story: we started May 15, 2006, and made it official Aug 15, 2008. In 2026 we celebrate both—twenty years of choosing each other and eighteen of paperwork. Double cake, double toasts, same two weirdos still building the coziest home in each other.",
      image: "https://vitalybook.s3.us-west-1.amazonaws.com/Our+Story+Page+Slideshow/May_15_and_Aug_15_2026_20_Years_Together_18_Married.jpg",
      year: 2026
    }
  ]);

  // Sort slides by year to ensure timeline is chronological
  const sortedSlides = [...slides].sort((a, b) => {
    // First sort by year
    if (a.year !== b.year) {
      return a.year - b.year;
    }

    // If years are the same, try to sort by month if available
    const aMonth = a.date.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/i);
    const bMonth = b.date.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/i);
    const months = {
      'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
      'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
    };

    if (aMonth && bMonth) {
      const aMonthNum = months[aMonth[0].toLowerCase()];
      const bMonthNum = months[bMonth[0].toLowerCase()];
      if (aMonthNum !== bMonthNum) {
        return aMonthNum - bMonthNum;
      }
    }

    // If we can't determine by month, use the original order
    return a.id - b.id;
  });

  // Calculate min and max years for the timeline
  const minYear = Math.min(...sortedSlides.map(slide => slide.year));
  const maxYear = Math.max(...sortedSlides.map(slide => slide.year));
  const yearRange = maxYear - minYear;

  // Update slider value when current slide changes
  useEffect(() => {
    if (!isDragging) {
      const currentYear = sortedSlides[currentSlide].year;
      setSliderValue(((currentYear - minYear) / yearRange) * 100);
    }
  }, [currentSlide, isDragging, minYear, yearRange, sortedSlides]);

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (autoplay && !isHovered && !isDragging) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prevSlide) => (prevSlide + 1) % sortedSlides.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [autoplay, isHovered, isDragging, sortedSlides.length]);

  // Navigation functions
  const nextSlide = () => {
    setAutoplay(false); // Disable autoplay when manually navigating
    setDirection(1);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sortedSlides.length);
    setShowMobileDetail(false); // Reset mobile detail view on navigation
  };

  const prevSlide = () => {
    setAutoplay(false); // Disable autoplay when manually navigating
    setDirection(-1);
    setCurrentSlide((prevSlide) => (prevSlide - 1 + sortedSlides.length) % sortedSlides.length);
    setShowMobileDetail(false); // Reset mobile detail view on navigation
  };

  // Handle timeline slider change
  const handleTimelineChange = (e) => {
    const value = parseFloat(e.target.value);
    setSliderValue(value);

    // Calculate which slide to show based on the slider position
    const targetYear = Math.round((value / 100) * yearRange) + minYear;

    // Find the closest slide to the target year
    let closestSlideIndex = 0;
    let closestDistance = Math.abs(sortedSlides[0].year - targetYear);

    sortedSlides.forEach((slide, index) => {
      const distance = Math.abs(slide.year - targetYear);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSlideIndex = index;
      }
    });

    // Set direction based on the new target slide
    setDirection(closestSlideIndex > currentSlide ? 1 : -1);
    setCurrentSlide(closestSlideIndex);
    setShowMobileDetail(false); // Reset mobile detail view on timeline change
  };

  // Scroll to year in timeline (for mobile)
  const scrollToYear = (year) => {
    if (timelineRef.current && isMobile) {
      const yearElement = document.getElementById(`year-marker-${year}`);
      if (yearElement) {
        const scrollPosition = yearElement.offsetLeft - (timelineRef.current.clientWidth / 2) + 20;
        timelineRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // When current slide changes, scroll to that year in the mobile timeline
  useEffect(() => {
    if (isMobile) {
      scrollToYear(sortedSlides[currentSlide].year);
    }
  }, [currentSlide, isMobile, sortedSlides]);

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  // Generate timeline markers - UPDATED to only show years with content
  const timelineMarkers = [];

  // Get unique years that have content
  const yearsWithContent = [...new Set(sortedSlides.map(slide => slide.year))].sort((a, b) => a - b);

  // Create markers only for years that have content
  yearsWithContent.forEach(year => {
    // Calculate position as percentage based on the full range
    const position = ((year - minYear) / yearRange) * 100;

    timelineMarkers.push(
      <div
        id={`year-marker-${year}`}
        key={year}
        className={`flex-shrink-0 flex flex-col items-center mr-8 last:mr-0 ${year === sortedSlides[currentSlide].year ? 'scale-110' : ''}`}
        style={isMobile ? {} : {position: 'absolute', left: `${position}%`, transform: 'translateX(-50%)'}}
        onClick={() => {
          // Find first slide with this year
          const slideIndex = sortedSlides.findIndex(slide => slide.year === year);
          if (slideIndex !== -1) {
            setDirection(slideIndex > currentSlide ? 1 : -1);
            setCurrentSlide(slideIndex);
            setAutoplay(false);
            setShowMobileDetail(false); // Reset mobile detail view when changing year
          }
        }}
      >
        <div
          className={`w-3 h-3 rounded-full ${year === sortedSlides[currentSlide].year ? 'bg-indigo-600 shadow-glow' : 'bg-gray-300'} mb-1 transition-all duration-300`}
        ></div>
        <span
          className={`text-xs ${year === sortedSlides[currentSlide].year ? 'text-indigo-600 font-bold' : 'text-gray-600'} whitespace-nowrap transition-all duration-300`}
        >
          {year}
        </span>
      </div>
    );
  });

  // Enhanced decorative elements for animation - MORE VARIETY
  const decorativeElements = [
    // Hearts
    {type: "heart", color: "text-red-400", top: "5%", left: "5%", animation: "float-slow"},
    {type: "heart", color: "text-blue-400", top: "10%", right: "8%", animation: "float-medium"},
    {type: "heart", color: "text-purple-400", bottom: "15%", left: "12%", animation: "float-fast"},
    {type: "heart", color: "text-pink-400", bottom: "8%", right: "5%", animation: "float-medium"},
    {type: "heart", color: "text-green-400", top: "22%", left: "25%", animation: "float-medium"},
    {type: "heart", color: "text-yellow-400", bottom: "22%", right: "25%", animation: "float-fast"},

    // Circles
    {type: "circle", color: "bg-yellow-200", top: "15%", right: "15%", animation: "float-slow"},
    {type: "circle", color: "bg-green-200", bottom: "20%", left: "20%", animation: "float-medium"},
    {type: "circle", color: "bg-blue-200", top: "30%", left: "30%", animation: "float-fast"},
    {type: "circle", color: "bg-purple-200", bottom: "35%", right: "25%", animation: "float-slow"},

    // Stars
    {type: "star", color: "text-amber-400", top: "25%", left: "25%", animation: "float-fast"},
    {type: "star", color: "text-indigo-400", bottom: "25%", right: "25%", animation: "float-medium"},
    {type: "star", color: "text-emerald-400", top: "40%", right: "10%", animation: "float-slow"},
    {type: "star", color: "text-rose-400", bottom: "40%", left: "10%", animation: "float-medium"},

    // Confetti
    {type: "confetti", color: "bg-orange-300", top: "30%", right: "30%", animation: "float-slow"},
    {type: "confetti", color: "bg-teal-300", bottom: "30%", left: "30%", animation: "float-fast"},
    {type: "confetti", color: "bg-pink-300", top: "50%", left: "15%", animation: "float-medium"},
    {type: "confetti", color: "bg-indigo-300", bottom: "10%", right: "35%", animation: "float-slow"},

    // Rings
    {type: "ring", color: "border-gold", top: "20%", left: "40%", animation: "float-slow"},
    {type: "ring", color: "border-silver", bottom: "20%", right: "40%", animation: "float-medium"},
    {type: "ring", color: "border-gold", top: "60%", right: "15%", animation: "float-medium"},
    {type: "ring", color: "border-silver", bottom: "60%", left: "15%", animation: "float-slow"},

    // Flowers
    {type: "flower", emoji: "🌸", top: "45%", left: "5%", animation: "float-slow"},
    {type: "flower", emoji: "🌺", top: "15%", right: "45%", animation: "float-medium"},
    {type: "flower", emoji: "🌷", bottom: "45%", right: "5%", animation: "float-fast"},
    {type: "flower", emoji: "🌹", top: "55%", right: "55%", animation: "float-slow"},
    {type: "flower", emoji: "💐", bottom: "15%", left: "45%", animation: "float-medium"},

    // Wedding symbols
    {type: "wedding", emoji: "💍", top: "35%", right: "20%", animation: "float-medium"},
    {type: "wedding", emoji: "🎂", bottom: "35%", left: "20%", animation: "float-slow"},
    {type: "wedding", emoji: "🔔", top: "65%", left: "35%", animation: "float-fast"},
    {type: "wedding", emoji: "✨", bottom: "65%", right: "35%", animation: "float-medium"},

    // Balloons
    {type: "balloon", gradient: "rainbow1", bottom: "5%", left: "45%", animation: "float-slow"},
    {type: "balloon", gradient: "rainbow2", top: "5%", left: "75%", animation: "float-medium"},
  ];

  // Function to open image in modal
  const openImageModal = () => {
    const currentSlideData = sortedSlides[currentSlide];
    setSelectedImage({
      src: currentSlideData.image,
      title: currentSlideData.title,
      description: currentSlideData.description,
      date: currentSlideData.date
    });
    setModalSlideIndex(currentSlide);
  };

  // Function to close image modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Function to navigate to next slide in modal
  const nextSlideInModal = () => {
    const nextIndex = (modalSlideIndex + 1) % sortedSlides.length;
    setModalSlideIndex(nextIndex);
    setSelectedImage({
      src: sortedSlides[nextIndex].image,
      title: sortedSlides[nextIndex].title,
      description: sortedSlides[nextIndex].description,
      date: sortedSlides[nextIndex].date
    });
  };

  // Function to navigate to previous slide in modal
  const prevSlideInModal = () => {
    const prevIndex = (modalSlideIndex - 1 + sortedSlides.length) % sortedSlides.length;
    setModalSlideIndex(prevIndex);
    setSelectedImage({
      src: sortedSlides[prevIndex].image,
      title: sortedSlides[prevIndex].title,
      description: sortedSlides[prevIndex].description,
      date: sortedSlides[prevIndex].date
    });
  };

  // Mobile touch handlers for swiping
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const difference = touchStartX - touchEndX;
    const threshold = 50; // minimum distance to be considered a swipe
    
    if (difference > threshold) {
      // Swipe left - go to next slide
      nextSlide();
    } else if (difference < -threshold) {
      // Swipe right - go to previous slide
      prevSlide();
    }
    
    // Reset values
    setTouchStartX(0);
    setTouchEndX(0);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden p-8 md:p-12 rounded-2xl">
      {/* Rainbow gradient strip at top */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"></div>

      {/* Rainbow gradient strip at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"></div>

      {/* Animated decorative elements */}
      {decorativeElements.map((element, index) => {
        // Render different shapes based on type
        let elementContent;

        if (element.type === "heart") {
          elementContent = (
            <div className={`${element.color}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
              </svg>
            </div>
          );
        } else if (element.type === "circle") {
          elementContent = <div className={`w-4 h-4 rounded-full ${element.color}`}></div>;
        } else if (element.type === "star") {
          elementContent = (
            <div className={`${element.color}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </div>
          );
        } else if (element.type === "confetti") {
          elementContent = <div className={`w-3 h-3 transform rotate-45 ${element.color}`}></div>;
        } else if (element.type === "ring") {
          elementContent = (
            <div className={`w-8 h-8 rounded-full border-2 ${element.color === "border-gold" ? "border-yellow-400" : "border-gray-300"}`}></div>
          );
        } else if (element.type === "flower" || element.type === "wedding") {
          elementContent = <div className="text-2xl">{element.emoji}</div>;
        } else if (element.type === "balloon") {
          elementContent = (
            <div className="w-6 h-10">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <defs>
                  <linearGradient id={`balloon-${element.gradient}-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    {element.gradient === "rainbow1" ? (
                      <>
                        <stop offset="0%" stopColor="#FF0018" />
                        <stop offset="16%" stopColor="#FFA52C" />
                        <stop offset="32%" stopColor="#FFFF41" />
                        <stop offset="48%" stopColor="#008018" />
                        <stop offset="66%" stopColor="#0000F9" />
                        <stop offset="83%" stopColor="#86007D" />
                        <stop offset="100%" stopColor="#FF0018" />
                      </>
                    ) : (
                      <>
                        <stop offset="0%" stopColor="#86007D" />
                        <stop offset="16%" stopColor="#0000F9" />
                        <stop offset="32%" stopColor="#008018" />
                        <stop offset="48%" stopColor="#FFFF41" />
                        <stop offset="66%" stopColor="#FFA52C" />
                        <stop offset="83%" stopColor="#FF0018" />
                        <stop offset="100%" stopColor="#86007D" />
                      </>
                    )}
                  </linearGradient>
                </defs>
                <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill={`url(#balloon-${element.gradient}-${index})`} />
              </svg>
            </div>
          );
        }

        return (
          <motion.div
            key={`decor-${index}`}
            className={`absolute opacity-40`}
            style={{
              top: element.top,
              left: element.left,
              right: element.right,
              bottom: element.bottom,
              zIndex: 0
            }}
            animate={{
              y: [0, -10, 0, -5, 0],
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.1, 1, 0.9, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: element.animation === "float-slow" ? 8 : element.animation === "float-medium" ? 6 : 4,
              ease: "easeInOut"
            }}
          >
            {elementContent}
          </motion.div>
        );
      })}

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-30">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mb-4"></div>
            <p className="text-indigo-700 font-medium">Loading our memories...</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        {/* DESKTOP VIEW */}
        {!isMobile && (
          <>
            {/* Main slideshow container */}
            <div 
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Main slideshow */}
              <div 
                className="relative h-[500px] md:h-[550px] rounded-xl overflow-hidden shadow-lg z-10 mb-8 cursor-pointer" 
                onClick={openImageModal}
              >
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex flex-col md:flex-row"
                  >
                    {/* Image side */}
                    <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                        style={{ backgroundImage: `url(${sortedSlides[currentSlide].image})` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent to-black/50"></div>
                    </div>

                    {/* Content side */}
                    <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white/80 backdrop-blur-sm p-6 md:p-10 flex flex-col justify-center overflow-y-auto">
                      {/* Date and title wrapper */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 text-indigo-500 mb-2">
                          <SafeIcon icon={FiCalendar} className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm font-medium truncate">{sortedSlides[currentSlide].date}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif text-stone-800">
                          {sortedSlides[currentSlide].title}
                        </h3>
                      </div>
                      <div className="overflow-y-auto flex-grow">
                        <p className="text-stone-600 leading-relaxed">
                          {sortedSlides[currentSlide].description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation buttons */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-stone-800 p-2 rounded-full shadow-lg transition-colors z-10"
                  aria-label="Previous slide"
                >
                  <SafeIcon icon={FiChevronLeft} className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-stone-800 p-2 rounded-full shadow-lg transition-colors z-10"
                  aria-label="Next slide"
                >
                  <SafeIcon icon={FiChevronRight} className="w-6 h-6" />
                </button>

                {/* Click to view hint */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/70 text-stone-800 px-3 py-1 rounded-full text-sm font-medium z-10 flex items-center space-x-1 animate-pulse">
                  <SafeIcon icon={FiBookOpen} className="w-4 h-4" />
                  <span>Click to view full image</span>
                </div>
              </div>
            </div>

            {/* Timeline slider - desktop version */}
            <div className="relative px-4 hidden md:block">
              <div className="relative h-16">
                {/* Timeline markers */}
                <div className="absolute top-0 left-0 right-0 h-10">
                  {timelineMarkers}
                </div>

                {/* Timeline slider track */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    style={{ width: `${sliderValue}%` }}
                  ></div>
                </div>

                {/* Slider thumb */}
                <input
                  ref={sliderRef}
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={handleTimelineChange}
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                  className="absolute bottom-0 left-0 w-full h-2 opacity-0 cursor-pointer z-20"
                />
                <div
                  className="absolute bottom-0 w-6 h-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/3 pointer-events-none"
                  style={{ left: `${sliderValue}%` }}
                ></div>

                {/* Current year indicator */}
                <div
                  className="absolute bottom-8 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                  style={{ left: `${sliderValue}%` }}
                >
                  {sortedSlides[currentSlide].year}
                </div>
              </div>
            </div>
          </>
        )}

        {/* MOBILE VIEW - COMPLETELY REDESIGNED */}
        {isMobile && (
          <>
            {/* Mobile view mode toggle buttons */}
            <div className="flex justify-center space-x-2 mb-4">
              <button 
                onClick={() => setMobileViewMode('card')}
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${mobileViewMode === 'card' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
              >
                <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                <span>Card</span>
              </button>
              <button 
                onClick={() => setMobileViewMode('grid')}
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${mobileViewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
              >
                <SafeIcon icon={FiGrid} className="w-4 h-4 mr-1" />
                <span>Grid</span>
              </button>
              <button 
                onClick={() => setMobileViewMode('list')}
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${mobileViewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
              >
                <SafeIcon icon={FiList} className="w-4 h-4 mr-1" />
                <span>List</span>
              </button>
            </div>

            {/* NEW STORYBOOK-STYLE MOBILE VIEW */}
            {mobileViewMode === 'card' && (
              <div 
                className="relative h-[400px] overflow-hidden rounded-xl shadow-lg cursor-pointer"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={openImageModal}
              >
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    {/* Full image background */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${sortedSlides[currentSlide].image})` }}
                    ></div>
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                    
                    {/* Date badge */}
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {sortedSlides[currentSlide].date}
                    </div>
                    
                    {/* Title and "Click to open" at the bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                      <h3 className="text-xl font-bold text-white mb-2 text-shadow-lg">
                        {sortedSlides[currentSlide].title}
                      </h3>
                      <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium inline-flex items-center space-x-1 animate-pulse">
                        <SafeIcon icon={FiBookOpen} className="w-4 h-4" />
                        <span>Click to open full image</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation buttons */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white p-2 rounded-full shadow-lg transition-colors z-10"
                  aria-label="Previous slide"
                >
                  <SafeIcon icon={FiChevronLeft} className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white p-2 rounded-full shadow-lg transition-colors z-10"
                  aria-label="Next slide"
                >
                  <SafeIcon icon={FiChevronRight} className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Grid View - Visual grid of all slides */}
            {mobileViewMode === 'grid' && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-3 max-h-[500px] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-3">
                    {sortedSlides.map((slide, index) => (
                      <div 
                        key={index}
                        className={`relative rounded-lg overflow-hidden cursor-pointer ${currentSlide === index ? 'ring-2 ring-indigo-600' : ''}`}
                        onClick={() => {
                          setCurrentSlide(index);
                          setDirection(index > currentSlide ? 1 : -1);
                          setMobileViewMode('card');
                        }}
                      >
                        <div className="aspect-w-4 aspect-h-3">
                          <img 
                            src={slide.image} 
                            alt={slide.title} 
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                            <div className="text-xs opacity-80 mb-1">{slide.date}</div>
                            <h4 className="font-medium text-sm line-clamp-1">{slide.title}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 border-t border-gray-200 text-center">
                  <button 
                    onClick={() => setMobileViewMode('card')}
                    className="text-indigo-600 text-sm font-medium flex items-center justify-center mx-auto"
                  >
                    <SafeIcon icon={FiArrowRight} className="mr-1 w-4 h-4" />
                    <span>Return to current slide</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* List View - Compact list of all slides */}
            {mobileViewMode === 'list' && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="max-h-[500px] overflow-y-auto">
                  {sortedSlides.map((slide, index) => (
                    <div 
                      key={index}
                      className={`flex items-center p-3 border-b border-gray-100 cursor-pointer ${currentSlide === index ? 'bg-indigo-50' : ''}`}
                      onClick={() => {
                        setCurrentSlide(index);
                        setDirection(index > currentSlide ? 1 : -1);
                        setMobileViewMode('card');
                      }}
                    >
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={slide.image} 
                          alt={slide.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-grow overflow-hidden">
                        <div className="text-xs text-indigo-600 mb-1">{slide.date}</div>
                        <h4 className="font-medium text-stone-800 truncate">{slide.title}</h4>
                      </div>
                      <SafeIcon 
                        icon={FiChevronRight} 
                        className={`w-4 h-4 text-gray-400 ml-2 ${currentSlide === index ? 'text-indigo-600' : ''}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200 text-center">
                  <button 
                    onClick={() => setMobileViewMode('card')}
                    className="text-indigo-600 text-sm font-medium flex items-center justify-center mx-auto"
                  >
                    <SafeIcon icon={FiArrowRight} className="mr-1 w-4 h-4" />
                    <span>Return to current slide</span>
                  </button>
                </div>
              </div>
            )}

            {/* Timeline scrollable - mobile version */}
            <div className="px-4 relative mt-6">
              <h4 className="text-sm font-medium text-stone-700 mb-2 text-center">Timeline</h4>
              <div
                ref={timelineRef}
                className="overflow-x-auto pb-4 flex items-start no-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
              >
                <div className="flex items-center space-x-2">
                  {timelineMarkers}
                </div>
              </div>
              <div className="text-center mt-1">
                <span className="text-xs text-gray-600">Scroll to navigate through years</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Enhanced Image Modal with navigation */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={closeImageModal}
          onNext={nextSlideInModal}
          onPrevious={prevSlideInModal}
          hasNavigation={true}
        />
      )}

      {/* CSS for shadow glow effect */}
      <style jsx="true">{`
        .shadow-glow {
          box-shadow: 0 0 8px 2px rgba(79,70,229,0.6);
        }
        
        .text-shadow-lg {
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }
      `}</style>
    </div>
  );
};

export default Slideshow;