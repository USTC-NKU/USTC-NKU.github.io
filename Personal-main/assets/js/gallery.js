const data = [
  {
      place:'吉林省 延边市',
      title:'长白山天池',
      title2:'中国最深最高的湖',
      description:'天东长白近蓬瀛，白衣仙人玉雪清。这里火山地貌与冰川遗迹同生共存，这里空中花园与莽莽丛林刚柔相济。在这里，灵秀与雄奇、蛮荒与恬适、巍峨与绮丽完美地融合在一起',
      image:'./img/gallery/gallery-1.avif'
  },
  {
      place:'江苏省 连云港市',
      title:'海滨公园',
      title2:'秋水共长天一色',
      description:'晚霞如火焰般燃烧，天空被炫目的橙红色和深邃的紫色渲染成画。轻纱般飘逸的层层云朵，映衬着远处的山峦，静谧而神秘。水面如镜，倒映着这片天空的辉煌，波光粼粼，仿佛在低声吟唱着自然的赞歌',
      image:'./img/gallery/gallery-2.avif'
  },
  {
      place:'山东省 泰安市',
      title:'神岳泰山',
      title2:'高山仰止',
      description:'你形成于距今27亿年前，望府山英云闪长片麻岩铸就了你的躯体。在亿万年凝固的时光里，构造运动、风蚀水琢等自然应力不断雕琢你，你也为先民提供“生五谷桑麻，鱼盐出焉”的优渥环境。齐鲁大地，华夏神州，你是众山之宗主，亦是国之神山',
      image:'./img/gallery/gallery-3.avif'
  },
  {
      place:'山东省 济南市',
      title:'济南的春天',
      title2:'济南潇洒似江南',
      description:'大明湖边，柳丝披拂，如烟似雾；桃花盛开，浓艳欲滴；山岚云气，喷珠吐玉......济南的春天，茶花、名泉、青山、鸟鸣、喧市、大明，构成一幅生动的“画船开，红尘外，烟水间，乾坤大，四面云山无遮碍，影摇动城郭楼台，人间惊得百鸟皑”的光景',
      image:'./img/gallery/gallery-4.avif'
  },
  {
      place:'江苏省 - 苏州市',
      title:'十年之约',
      title2:'风景旧曾谙',
      description:'江南美，最美在苏杭，吴侬软语，流淌在小桥流水人家之上，惊鸿艳影，一闪而逝在曲静深悠的小巷中。童年长于此，伴彼此。阔别多载，十年之约，再相遇，依然感叹“君到姑苏见，人家尽枕河”，很高兴看到风景如旧，彼此一切如故地安好',
      image:'./img/gallery/gallery-5.avif'
  },
  {
      place:'天津市 - 天津市',
      title:'你未必光芒万丈',
      title2:'但始终为我记得',
      description:'晚风、星空、歌声、灯光......一起历经特别的四年，一起走过特别的四年，当伙伴们再次聚集户外，让无垠声浪越过围栏，让点点繁星各归其轨，闪烁着，留下瞬间永恒',
      image:'./img/gallery/gallery-6.avif'
  },
]

const _ = (id)=>document.getElementById(id)
const cards = data.map((i, index)=>`<div class="card" id="card${index}" style="background-image:url(${i.image});"  ></div>`).join('')



const cardContents = data.map((i, index)=>`<div class="card-content" id="card-content-${index}">
<div class="content-start"></div>
<div class="content-place">${i.place}</div>
<div class="content-title-1">${i.title}</div>
<div class="content-title-2">${i.title2}</div>

</div>`).join('')


const sildeNumbers = data.map((_, index)=>`<div class="item" id="slide-item-${index}" >${index+1}</div>`).join('')
_('demo').innerHTML =  cards + cardContents
_('slide-numbers').innerHTML =  sildeNumbers


const range = (n) =>
Array(n)
  .fill(0)
  .map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
return `#card${index}`;
}
function getCardContent(index) {
return `#card-content-${index}`;
}
function getSliderItem(index) {
return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
return new Promise((resolve) => {
  gsap.to(target, {
    ...properties,
    duration: duration,
    onComplete: resolve,
  });
});
}

let order = [0, 1, 2, 3, 4, 5];
let detailsEven = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

function init() {
const [active, ...rest] = order;
const detailsActive = detailsEven ? "#details-even" : "#details-odd";
const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
const { innerHeight: height, innerWidth: width } = window;
offsetTop = height - 430;
offsetLeft = width - 830;

gsap.set("#pagination", {
  top: offsetTop + 330,
  left: offsetLeft,
  y: 200,
  opacity: 0,
  zIndex: 60,
});


gsap.set(getCard(active), {
  x: 0,
  y: 0,
  width: window.innerWidth,
  height: window.innerHeight,
});
gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
gsap.set(`${detailsInactive} .text`, { y: 100 });
gsap.set(`${detailsInactive} .title-1`, { y: 100 });
gsap.set(`${detailsInactive} .title-2`, { y: 100 });
gsap.set(`${detailsInactive} .desc`, { y: 50 });
gsap.set(`${detailsInactive} .cta`, { y: 60 });

gsap.set(".progress-sub-foreground", {
  width: 500 * (1 / order.length) * (active + 1),
});

rest.forEach((i, index) => {
  gsap.set(getCard(i), {
    x: offsetLeft + 400 + index * (cardWidth + gap),
    y: offsetTop,
    width: cardWidth,
    height: cardHeight,
    zIndex: 30,
    borderRadius: 10,
  });
  gsap.set(getCardContent(i), {
    x: offsetLeft + 400 + index * (cardWidth + gap),
    zIndex: 40,
    y: offsetTop + cardHeight - 100,
  });
  gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
});

gsap.set(".jindicator", { x: -window.innerWidth });

const startDelay = 0.6;

gsap.to(".cover", {
  x: width + 400,
  delay: 0.5,
  ease,
  onComplete: () => {
    setTimeout(() => {
      loop();
    }, 500);
  },
});
rest.forEach((i, index) => {
  gsap.to(getCard(i), {
    x: offsetLeft + index * (cardWidth + gap),
    zIndex: 30,
    delay: 0.05 * index,
    ease,
    delay: startDelay,
  });
  gsap.to(getCardContent(i), {
    x: offsetLeft + index * (cardWidth + gap),
    zIndex: 40,
    delay: 0.05 * index,
    ease,
    delay: startDelay,
  });
});
gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
//gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

let clicks = 0;

function step() {
return new Promise((resolve) => {
  order.push(order.shift());
  detailsEven = !detailsEven;

  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

  document.querySelector(`${detailsActive} .place-box .text`).textContent =
    data[order[0]].place;
  document.querySelector(`${detailsActive} .title-1`).textContent =
    data[order[0]].title;
  document.querySelector(`${detailsActive} .title-2`).textContent =
    data[order[0]].title2;
  document.querySelector(`${detailsActive} .desc`).textContent =
    data[order[0]].description;

  gsap.set(detailsActive, { zIndex: 22 });
  gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
  gsap.to(`${detailsActive} .text`, {
    y: 0,
    delay: 0.1,
    duration: 0.7,
    ease,
  });
  gsap.to(`${detailsActive} .title-1`, {
    y: 0,
    delay: 0.15,
    duration: 0.7,
    ease,
  });
  gsap.to(`${detailsActive} .title-2`, {
    y: 0,
    delay: 0.15,
    duration: 0.7,
    ease,
  });
  gsap.to(`${detailsActive} .desc`, {
    y: 0,
    delay: 0.3,
    duration: 0.4,
    ease,
  });
  gsap.to(`${detailsActive} .cta`, {
    y: 0,
    delay: 0.35,
    duration: 0.4,
    onComplete: resolve,
    ease,
  });
  gsap.set(detailsInactive, { zIndex: 12 });

  const [active, ...rest] = order;
  const prv = rest[rest.length - 1];

  gsap.set(getCard(prv), { zIndex: 10 });
  gsap.set(getCard(active), { zIndex: 20 });
  gsap.to(getCard(prv), { scale: 1.5, ease });

  gsap.to(getCardContent(active), {
    y: offsetTop + cardHeight - 10,
    opacity: 0,
    duration: 0.3,
    ease,
  });
  gsap.to(getSliderItem(active), { x: 0, ease });
  gsap.to(getSliderItem(prv), { x: -numberSize, ease });
  gsap.to(".progress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
    ease,
  });

  gsap.to(getCard(active), {
    x: 0,
    y: 0,
    ease,
    width: window.innerWidth,
    height: window.innerHeight,
    borderRadius: 0,
    onComplete: () => {
      const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
      gsap.set(getCard(prv), {
        x: xNew,
        y: offsetTop,
        width: cardWidth,
        height: cardHeight,
        zIndex: 30,
        borderRadius: 10,
        scale: 1,
      });

      gsap.set(getCardContent(prv), {
        x: xNew,
        y: offsetTop + cardHeight - 100,
        opacity: 1,
        zIndex: 40,
      });
      gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

      gsap.set(detailsInactive, { opacity: 0 });
      gsap.set(`${detailsInactive} .text`, { y: 100 });
      gsap.set(`${detailsInactive} .title-1`, { y: 100 });
      gsap.set(`${detailsInactive} .title-2`, { y: 100 });
      gsap.set(`${detailsInactive} .desc`, { y: 50 });
      gsap.set(`${detailsInactive} .cta`, { y: 60 });
      clicks -= 1;
      if (clicks > 0) {
        step();
      }
    },
  });

  rest.forEach((i, index) => {
    if (i !== prv) {
      const xNew = offsetLeft + index * (cardWidth + gap);
      gsap.set(getCard(i), { zIndex: 30 });
      gsap.to(getCard(i), {
        x: xNew,
        y: offsetTop,
        width: cardWidth,
        height: cardHeight,
        ease,
        delay: 0.1 * (index + 1),
      });

      gsap.to(getCardContent(i), {
        x: xNew,
        y: offsetTop + cardHeight - 100,
        opacity: 1,
        zIndex: 40,
        ease,
        delay: 0.1 * (index + 1),
      });
      gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
    }
  });
});
}

async function loop() {
await animate(".jindicator", 2, { x: 0 });
await animate(".jindicator", 0.8, { x: window.innerWidth, delay: 0.3 });
set(".jindicator", { x: -window.innerWidth });
await step();
loop();
}

async function loadImage(src) {
return new Promise((resolve, reject) => {
  let img = new Image();
  img.onload = () => resolve(img);
  img.onerror = reject;
  img.src = src;
});
}

async function loadImages() {
const promises = data.map(({ image }) => loadImage(image));
return Promise.all(promises);
}

async function start() {
try {
  await loadImages();
  init();
} catch (error) {
  console.error("One or more images failed to load", error);
}
}

start()