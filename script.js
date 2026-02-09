// 获取或设置开始日期
function getStartDate() {
    let startDate = localStorage.getItem('journeyStartDate');
    if (!startDate) {
        // 如果没有保存过开始日期，使用当前日期作为默认值（但不保存）
        // 用户需要点击"开始地狱修行"按钮来正式开始
        return null;
    }
    return new Date(startDate);
}

// 倒计时功能
function updateCountdown() {
    const startDate = getStartDate();
    
    if (!startDate) {
        // 如果还没开始，显示总天数
        document.getElementById('days').textContent = '730';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        return;
    }
    
    const endDate = new Date(startDate.getTime() + (730 * 24 * 60 * 60 * 1000)); // 730天后
    const now = new Date();
    const diff = endDate - now;
    
    if (diff <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
}

// 每分钟更新一次倒计时
updateCountdown();
setInterval(updateCountdown, 60000);

// 标签页切换功能
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // 移除所有active类
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // 添加active类到当前选中的
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 开始按钮功能
function startJourney() {
    const existingStartDate = localStorage.getItem('journeyStartDate');
    
    if (existingStartDate) {
        const start = new Date(existingStartDate);
        const now = new Date();
        const daysPassed = Math.floor((now - start) / (1000 * 60 * 60 * 24));
        
        const continueJourney = confirm(`你已经在 ${start.toLocaleDateString('zh-CN')} 开始了旅程！\n\n已经坚持了 ${daysPassed} 天！\n\n是否要重新开始计时？\n（点击"取消"保持当前进度）`);
        
        if (!continueJourney) {
            return;
        }
    }
    
    const confirmed = confirm('准备好开始地狱修行了吗？\n\n这将是一段艰难但充满成长的旅程。\n\n点击确定开始你的宗师之路！');
    
    if (confirmed) {
        // 保存开始日期到localStorage
        const startDate = new Date();
        localStorage.setItem('journeyStartDate', startDate.toISOString());
        
        alert(`🔥 旅程已开始！\n\n开始日期：${startDate.toLocaleDateString('zh-CN')}\n结束日期：${new Date(startDate.getTime() + 730 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN')}\n\n记住：\n1. 拍下你的"Day 0"照片\n2. 购买必读书籍\n3. 创建你的社交媒体账号\n\n从今天起，每一天都是进化的一天！`);
        
        // 更新倒计时
        updateCountdown();
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 检查是否已经开始旅程
window.addEventListener('load', () => {
    const journeyStartDate = localStorage.getItem('journeyStartDate');
    if (journeyStartDate) {
        const start = new Date(journeyStartDate);
        const now = new Date();
        const daysPassed = Math.floor((now - start) / (1000 * 60 * 60 * 24));
        const daysRemaining = 730 - daysPassed;
        
        if (daysPassed > 0 && daysRemaining > 0) {
            console.log(`🔥 宗师之路进行中！`);
            console.log(`开始日期：${start.toLocaleDateString('zh-CN')}`);
            console.log(`已坚持：${daysPassed} 天`);
            console.log(`剩余：${daysRemaining} 天`);
            console.log(`完成度：${(daysPassed / 730 * 100).toFixed(1)}%`);
        } else if (daysRemaining <= 0) {
            console.log(`🎉 恭喜！你已经完成了730天的宗师之路！`);
        }
    } else {
        console.log(`💡 点击"开始地狱修行"按钮开始你的宗师之路`);
    }
});

// 添加滚动动画效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有卡片元素
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.goal-card, .timeline-item, .milestone-card, .cta-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});


// 防沉没系统模态框功能
const floatBtn = document.getElementById('floatBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

// 游戏规范模态框功能
const gameBtn = document.getElementById('gameBtn');
const gameModal = document.getElementById('gameModal');
const closeGameModal = document.getElementById('closeGameModal');

// 打开防沉没模态框
floatBtn.addEventListener('click', () => {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// 打开游戏规范模态框
gameBtn.addEventListener('click', () => {
    gameModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// 关闭防沉没模态框
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// 关闭游戏规范模态框
closeGameModal.addEventListener('click', () => {
    gameModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// 点击模态框外部关闭
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    if (e.target === gameModal) {
        gameModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// ESC键关闭模态框
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
        if (gameModal.classList.contains('show')) {
            gameModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
});
