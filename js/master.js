// عند تحميل الصفحة
window.onload = () => {
    ///////////////////     Slide Show (عرض الشرائح)     ////////////////

    // تعريف متغير للتحكم في حركة السلايد
    let backgroundStory = true;

    // استرجاع  الخلفية المحفوظ في التخزين المحلي (localStorage)

    let getBackgroundOption = localStorage.getItem("background-option");

    // متغير للتحكم في المؤقت (المُسمى backgroundInterval)
    let backgroundInterval;

    document.querySelectorAll('.background-option span').forEach(Element=>{
        Element.classList.remove('active');
    });
    
    if(getBackgroundOption !== null){
        if(getBackgroundOption==='yes'){
            backgroundStory = true;
            document.querySelector('.background-option .yes').classList.add('active');
        }
        else{
            backgroundStory=false;
            document.querySelector('.background-option .no').classList.add('active');
        }

    }else{
        backgroundStory= true;
    }

    // دالة لبدء حركة السلايد
    function slideShow() {
        if (backgroundStory) {
            var landingPage = document.querySelector('.landing-page');

            // مصفوفة تحتوي على صور العرض
            let gallery = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg'];

            // تحديث الصورة بشكل عشوائي كل ثانية
            backgroundInterval = setInterval(() => {
                let randomGallery = Math.floor(Math.random() * gallery.length);
                landingPage.style.backgroundImage = `url(./images/slide-show/${gallery[randomGallery]})`;
            }, 5000);
        }
    }

    // العناصر المتعلقة بخيارات الخلفية
    const backgroundOption = document.querySelectorAll('.background-option span');
    backgroundOption.forEach(span => {
        span.addEventListener("click", (e) => {
            // إزالة الكلاس 'active' من جميع العناصر الأخرى داخل نفس العنصر الأب
            e.target.parentElement.querySelectorAll('.active').forEach(Element => {
                Element.classList.remove('active');
            });

            // إضافة الكلاس 'active' إلى العنصر الحالي
            e.target.classList.add('active');

            // تعيين قيمة متغير backgroundStory بناءً على الخيار المُختار
            if (e.target.dataset.background === 'yes') {
                backgroundStory = true;
                slideShow();
            } else {
                backgroundStory = false;
                clearInterval(backgroundInterval); 
                slideShow();
            }
            //  وتعيين الخلفية المحفوظ في التخزين المحلي (localStorage)
            localStorage.setItem("background-option", e.target.dataset.background);
            
        });
    });
        

    ///////////////////     Slide Bar Settings (إعدادات شريط الإعدادات)     ////////////////

    // العناصر المتعلقة بشريط الإعدادات
    let stopSpin = document.querySelector('.container-gear .fa-gear');
    let openSetting = document.querySelector('.setting-box');

    // تفعيل/إلغاء تفعيل دوران العنصر وعرض شريط الإعدادات عند النقر
    stopSpin.onclick = function () {
        this.classList.toggle('fa-spin');
        openSetting.classList.toggle('active');
    }

    ///////////////////     Option Colors (خيارات الألوان)     ////////////////

    // العناصر المتعلقة بخيارات الألوان
    const setColor = document.querySelectorAll('.colors-list li');
    setColor.forEach(li => {
        li.addEventListener("click", (e) => {
            // تعيين اللون المحدد كمتغير في الجذر (الجذر الأساسي للصفحة)
            document.documentElement.style.setProperty('--color-4', e.target.dataset.color);
            localStorage.setItem("color-option", e.target.dataset.color);

            // إزالة الكلاس 'mainOPtion' من جميع العناصر الأخرى
            e.target.parentElement.querySelectorAll('.mainOPtion').forEach(Element => {
                Element.classList.remove('mainOPtion');
            });

            // إضافة الكلاس 'mainOPtion' إلى العنصر الحالي
            e.target.classList.add('mainOPtion');
        });
    });

    // استرجاع وتعيين اللون المحفوظ في التخزين المحلي (localStorage)
    let mainColor = localStorage.getItem("color-option");
    if (mainColor !== null) {
        document.documentElement.style.setProperty("--color-4", localStorage.getItem("color-option"));
    } else {
        document.documentElement.style.setProperty("--color-4", "#ff986f");
    }

    ///////////////////     Background color (لون الخلفية)     ////////////////

// العناصر المتعلقة بلون الخلفية
const setBackground = document.querySelectorAll('.backcolors-list li');
setBackground.forEach(li => {
    li.addEventListener("click", (e) => {
        // تعيين اللون المحدد كمتغير في الجذر (الجذر الأساسي للصفحة)
        document.documentElement.style.setProperty('--background-color-main', e.target.dataset.backcolor);
        localStorage.setItem("background-color", e.target.dataset.backcolor);

        // إزالة الكلاس 'setColor' من جميع العناصر الأخرى
        e.target.parentElement.querySelectorAll('.setColor').forEach(Element => {
            Element.classList.remove('setColor');
        });

        // إضافة الكلاس 'setColor' إلى العنصر الحالي
        e.target.classList.add('setColor');
    });
});

// استرجاع وتعيين لون الخلفية المحفوظ في التخزين المحلي (localStorage)
let backgroundColor = localStorage.getItem("background-color");
if (backgroundColor !== null) {
    document.documentElement.style.setProperty("--background-color-main", backgroundColor);
} else {
    document.documentElement.style.setProperty("--background-color-main", "#02617b");
}

/////////////////// Skills Selector ///////////////////

// الحصول على عناصر شريط العمل ومهارات المهارات
const skillProgressBars = document.querySelectorAll(".skill-progress span");

// دالة لتحريك شريط العمل
function animateProgressBar() {
    skillProgressBars.forEach(progressBar => {
        // الحصول على قيمة النسبة من السمة "data-progress"
        const progress = progressBar.getAttribute("data-progress");
        progressBar.style.width = progress; // تحديث عرض شريط العمل بناءً على القيمة المحددة
    });
}

// القيام بتنفيذ الدالة عندما يتم التمرير إلى قسم المهارات
window.addEventListener("scroll", function () {
    // الحصول على عنصر قسم المهارات
    const skillsSection = document.querySelector(".skills");
    
    // حساب موقع قسم المهارات بالنسبة لأعلى الصفحة
    const skillsSectionTop = skillsSection.offsetTop;
    
    // ارتفاع نافذة المستعرض
    const windowHeight = window.innerHeight;
    
    // موقع النص الحالي على الصفحة
    const scrollY = window.scrollY;

    // التحقق إذا كان تمرير الصفحة إلى منتصف قسم المهارات
    if (scrollY > skillsSectionTop - windowHeight / 2) {
        // تنفيذ دالة تحريك شريط العمل
        animateProgressBar();
    }
});

/////////////////// Gallery popup ///////////////////

// الحصول على جميع الصور في قسم المعرض
const galleryImages = document.querySelectorAll('.gallery-box img');

// تفعيل واجهة المستخدم للصور في قسم المعرض
galleryImages.forEach((img) => {
    img.onclick = function () {
        // إنشاء الطبقة الظليلة للعرض المنبثق
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';

        // إنشاء مربع العرض المنبثق
        const popupBox = document.createElement('div');
        popupBox.classList.add('popup-box');

        // إنشاء عنصر الصورة في مربع العرض المنبثق وتعيين مصدر الصورة إلى مصدر الصورة الأصلي
        const popupImg = document.createElement('img');
        popupImg.src = img.src;
        popupBox.appendChild(popupImg);

        // إضافة مربع العرض المنبثق إلى الصفحة
        document.body.appendChild(overlay);
        document.body.appendChild(popupBox);

        // إذا كانت هناك نصوص توضيحية للصورة، قم بإنشاء عنصر العنوان وإضافته إلى مربع العرض المنبثق
        if (img.alt !== null) {
            const imgHeading = document.createElement('h3'); // إنشاء عنصر العنوان (h3)
            const imgText = document.createTextNode(img.alt); // إنشاء نص العنوان بناءً على النص الموجود في خاصية alt للصورة
            imgHeading.appendChild(imgText); // إضافة نص العنوان إلى عنصر العنوان
            popupBox.appendChild(imgHeading); // إضافة عنصر العنوان إلى مربع العرض المنبثق
        }
                // إضافة زر "إغلاق" إلى مربع العرض المنبثق
        const closeButton = document.createElement('span');
        closeButton.className = 'popup-close';
        closeButton.innerHTML = '&times;'; // إضافة رمز "X" للزر
        popupBox.appendChild(closeButton);

        // تفعيل إغلاق العرض عند النقر على زر "إغلاق"
        closeButton.onclick = function () {
            document.body.removeChild(overlay);
            document.body.removeChild(popupBox);
        };


    };
});

///////////////////     Move Top Link     ///////////////////

const allLinks = document.querySelectorAll('.menu li a');

allLinks.forEach(link=>{
    link.addEventListener("click",(e)=>{
        e.preventDefault;
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        });
    });
});




var showSidebarButton = document.querySelector('.Burger');
var sidebar = document.getElementById('sidebar');

showSidebarButton.addEventListener('click', function() {
    sidebar.classList.toggle('open');
});

/////////////////// تشغيل حركة السلايد عند تحميل الصفحة ///////////////////

    slideShow();
}
