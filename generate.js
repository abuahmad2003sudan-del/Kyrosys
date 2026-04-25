const fs = require('fs');
let code = fs.readFileSync('src/constants.ts', 'utf8');

// I'll just write a script that generates the array and replaces the TEMPLATES block,
// and also changes ALL_TEMPLATES to use TEMPLATES

const input = `templatemo_480_story.zip
templatemo_481_elevate.zip
templatemo_482_strip.zip
templatemo_483_lumino.zip
templatemo_484_ocean.zip
templatemo_485_rainbow.zip
templatemo_486_new_event.zip
templatemo_487_fitness.zip
templatemo_488_classic.zip
templatemo_489_strategy.zip
templatemo_490_comila.zip
templatemo_491_flat.zip
templatemo_492_app_starter.zip
templatemo_493_snapshot.zip
templatemo_494_motion.zip
templatemo_495_metro_fit.zip
templatemo_496_pipeline.zip
templatemo_497_upper.zip
templatemo_498_stimulus.zip
templatemo_499_catalyst.zip
templatemo_500_fluid_gallery.zip
templatemo_501_neaty.zip
templatemo_502_short.zip
templatemo_503_newline.zip
templatemo_504_page_one.zip
templatemo_505_stacked.zip
templatemo_506_tinker.zip
templatemo_507_victory.zip
templatemo_508_power.zip
templatemo_509_hydro.zip
templatemo_510_letter.zip
templatemo_511_journey.zip
templatemo_512_moonlight.zip
templatemo_513_avalon.zip
templatemo_514_magazee.zip
templatemo_515_eatery.zip
templatemo_516_known.zip
templatemo_517_timeless.zip
templatemo_518_sentra.zip
templatemo_519_beauty.zip
templatemo_520_highway.zip
templatemo_521_get_ready.zip
templatemo_522_venue.zip
templatemo_523_image_survey.zip
templatemo_524_product_admin.zip
templatemo_525_the_town.zip
templatemo_527_sided.zip
templatemo_528_elegance.zip
templatemo_529_ramayana.zip
templatemo_530_mini_profile.zip
templatemo_531_reflux.zip
templatemo_532_next_level.zip
templatemo_533_verticard.zip
templatemo_534_parallo.zip
templatemo_535_softy_pinko.zip
templatemo_536_dream_pulse.zip
templatemo_537_art_factory.zip
templatemo_538_digital_trend.zip
templatemo_539_simple_house.zip
templatemo_540_lava_landing_page.zip
templatemo_542_new_vision.zip
templatemo_543_breezed.zip
templatemo_544_comparto.zip
templatemo_545_finance_business.zip
templatemo_547_real_dynamic.zip
templatemo_549_business_oriented.zip
templatemo_550_diagoona.zip
templatemo_551_stand_blog.zip
templatemo_552_video_catalog.zip
templatemo_553_xtra_blog.zip
templatemo_557_grad_school.zip
templatemo_558_klassy_cafe.zip
templatemo_560_astro_motion.zip
templatemo_561_purple_buzz.zip
templatemo_562_space_dynamic.zip
templatemo_563_seo_dream.zip
templatemo_564_plot_listing.zip
templatemo_565_onix_digital.zip
templatemo_567_nomad_force.zip
templatemo_568_digimedia.zip
templatemo_569_edu_meeting.zip
templatemo_570_chain_app_dev.zip
templatemo_571_hexashop.zip
templatemo_573_eduwell.zip
templatemo_574_mexant.zip
templatemo_575_leadership_event.zip
templatemo_579_cyborg_gaming.zip
templatemo_580_woox_travel.zip
templatemo_581_kind_heart_charity.zip
templatemo_582_tale_seo_agency.zip
templatemo_583_festava_live.zip
templatemo_584_pod_talk.zip
templatemo_585_barber_shop.zip
templatemo_586_scholar.zip
templatemo_587_tiya_golf_club.zip
templatemo_588_ebook_landing.zip
templatemo_589_lugx_gaming.zip
templatemo_590_topic_listing.zip
templatemo_591_villa_agency.zip
templatemo_592_glossy_touch.zip
templatemo_593_personal_shape.zip
templatemo_594_nexus_flow.zip
templatemo_595_3d_coverflow.zip
templatemo_596_electric_xtra.zip
templatemo_597_neural_glass.zip
templatemo_598_sleeky_pro.zip
templatemo_599_noir_fashion.zip
templatemo_600_prism_flux.zip
templatemo_601_chain_summit.zip
templatemo_602_graph_page.zip
templatemo_603_nexaverse.zip
templatemo_604_christmas_piano.zip
templatemo_605_xmas_countdown.zip
templatemo_606_string_master.zip
templatemo_607_glass_admin.zip
templatemo_608_daynight_admin.zip
templatemo_609_crypto_vault.zip
templatemo_610_aurum_gold.zip
templatemo_611_maison_doree.zip
templatemo_612_parallax_starter.zip
templatemo_613_frost_bakery.zip
templatemo_614_quantix_saas.zip
templatemo_615_amber_folio.zip
templatemo_616_split_index.zip
templatemo_617_pixel_forge.zip`;

const files = input.split('\n').map(f => f.trim()).filter(Boolean);

function titleCase(str) {
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function determineCategory(title) {
  const t = title.toLowerCase();
  
  if (t.includes('admin') || t.includes('dashboard')) return 'Admin Dashboard';
  if (t.includes('blog') || t.includes('magazee') || t.includes('news')) return 'Blog';
  if (t.includes('shop') || t.includes('commerce') || t.includes('sale') || t.includes('eatery')) return 'E-commerce';
  if (t.includes('landing') || t.includes('page') || t.includes('start')) return 'Landing Page';
  if (t.includes('portfolio') || t.includes('folio') || t.includes('profile')) return 'Portfolio';
  if (t.includes('event') || t.includes('festival') || t.includes('live')) return 'Entertainment';
  if (t.includes('edu') || t.includes('school') || t.includes('scholar') || t.includes('academy')) return 'Education';
  if (t.includes('health') || t.includes('fitness') || t.includes('fit') || t.includes('medical') || t.includes('dentist')) return 'Health';
  if (t.includes('tech') || t.includes('app') || t.includes('crypto')) return 'Tech';
  if (t.includes('saas') || t.includes('startup') || t.includes('software')) return 'SaaS';
  if (t.includes('gold') || t.includes('luxury') || t.includes('maison') || t.includes('aurum')) return 'Luxury';
  if (t.includes('creative') || t.includes('design') || t.includes('art')) return 'Creative';
  if (t.includes('personal')) return 'Personal';
  return 'Business';
}

function determineIsNiche(title) {
  const t = title.toLowerCase();
  const niches = ['fitness', 'health', 'gaming', 'education', 'charity', 'golf', 'christmas', 'barber', 'crypto', 'bakery', 'piano', 'saxophone', 'string master', 'leadership', 'event', 'dentist'];
  return niches.some(n => t.includes(n));
}

const templates = files.map((filename, index) => {
  let nameWithoutZip = filename.replace('.zip', '');
  
  let cleanName = nameWithoutZip;
  if(cleanName.startsWith('templatemo_')) {
     let parts = cleanName.split('_');
     if (!isNaN(parts[1])) {
       cleanName = parts.slice(2).join(' ');
     } else {
       cleanName = parts.slice(1).join(' ');
     }
  } else if (cleanName.startsWith('template_')) {
     let parts = cleanName.split('_');
     cleanName = parts.slice(1).join(' ');
  } else {
    let parts = cleanName.split('_');
    if (!isNaN(parts[0])) {
      cleanName = parts.slice(1).join(' ');
    } else {
      cleanName = cleanName.replace(/_/g, ' ');
    }
  }
  
  cleanName = cleanName.replace(/_/g, ' ');
  let title = titleCase(cleanName);
  let category = determineCategory(title);
  let isNiche = determineIsNiche(title);
  
  let price = Math.floor(Math.random() * (129 - 39 + 1)) + 39;
  if (category === 'Luxury' || title.includes('Pixel Forge') || title.includes('Aurum Gold') || title.includes('Maison Doree')) {
     price = Math.floor(Math.random() * (199 - 149 + 1)) + 149;
  }
  let originalPrice = Math.floor(price * (1 + (Math.random() * 0.1 + 0.2)));
  
  let hasAi = Math.random() < 0.3;
  
  const badges = ['جديد', 'الأكثر مبيعاً', 'خصم', ''];
  let badge = badges[Math.floor(Math.random() * badges.length)];
  
  const valuePropositions = [
    "استثمر في قالب " + title + " ووفر عشرات الساعات من التطوير.",
    "تصميم مثالي من " + title + " مجهز لتحويل الزوار إلى عملاء.",
    "قالب احترافي يعكس جودة علامتك التجارية باستخدام " + title + ".",
    "وفر 20 ساعة عمل على الأقل مع إعدادات جاهزة للـ SEO."
  ];
  
  return {
    id: String(index + 1),
    title: title, // mapped to title matching category style
    category: category,
    price: price,
    originalPrice: originalPrice,
    image: "/templates/" + nameWithoutZip + "/preview.jpg",
    thumbnail: "/templates/" + nameWithoutZip + "/preview.jpg",
    demoUrl: '#',
    downloadUrl: "/templates/" + filename,
    isNiche: isNiche,
    aiFeatures: hasAi ? ['AI Content Generator', 'AI Image Optimizer'] : [],
    badge: badge,
    valueProposition: valuePropositions[index % valuePropositions.length],
    rating: Number((Math.random() * 0.5 + 4.5).toFixed(1)),
    reviews: Math.floor(Math.random() * 2000) + 50,
    author: "Kyrosys Vault",
    description: "قالب ممتاز وحصري مصمم بعناية فائقة لتلبية أعلى معايير الجودة."
  };
});

const tsCode = "export const TEMPLATES: Template[] = " + JSON.stringify(templates, null, 2) + ";";

code = code.replace(/export const TEMPLATES[\s\S]*?\];/m, tsCode);
code = code.replace(/export const EXTENDED_TEMPLATES[\s\S]*?\];/m, "");
code = code.replace(/export const ALL_TEMPLATES = EXTENDED_TEMPLATES;/m, "export const ALL_TEMPLATES = TEMPLATES;");

fs.writeFileSync('src/constants.ts', code);
console.log("Done updating constants.ts precisely.");
