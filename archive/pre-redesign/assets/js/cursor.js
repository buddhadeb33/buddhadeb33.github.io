class EnhancedCursor {
    constructor() {
        this.delay = 6;
        this._x = 0;
        this._y = 0;
        this.endX = window.innerWidth / 2;
        this.endY = window.innerHeight / 2;
        this.cursorVisible = true;
        this.isHovering = false;
        this.isClicking = false;
        this.isOnText = false;
        this.isLoading = false;
        
        this.$dot = document.querySelector('.cursor-dot');
        this.$outline = document.querySelector('.cursor-dot-outline');
        
        this.init();
    }
    
    init() {
        if (!this.$dot || !this.$outline) {
            console.warn('Cursor elements not found');
            return;
        }
        
        this.setupEventListeners();
        this.animate();
        this.showCursor();
    }
    
    setupEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.endX = e.clientX;
            this.endY = e.clientY;
            this.showCursor();
        });
        
        // Mouse enter/leave document
        document.addEventListener('mouseenter', () => this.showCursor());
        document.addEventListener('mouseleave', () => this.hideCursor());
        
        // Click events
        document.addEventListener('mousedown', () => this.handleClick());
        document.addEventListener('mouseup', () => this.handleClickEnd());
        
        // Hover events for interactive elements
        this.setupHoverEvents();
        
        // Text selection
        document.addEventListener('selectstart', () => this.handleTextSelection());
        document.addEventListener('selectionchange', () => this.handleTextSelection());
        
        // Loading states
        window.addEventListener('load', () => this.handlePageLoad());
        
        // Resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    setupHoverEvents() {
        // Links
        document.querySelectorAll('a, button, [role="button"]').forEach(el => {
            el.addEventListener('mouseenter', () => this.handleHover('link'));
            el.addEventListener('mouseleave', () => this.handleHoverEnd());
        });
        
        // Input fields and text areas
        document.querySelectorAll('input, textarea, [contenteditable]').forEach(el => {
            el.addEventListener('mouseenter', () => this.handleHover('text'));
            el.addEventListener('mouseleave', () => this.handleHoverEnd());
        });
        
        // Images
        document.querySelectorAll('img').forEach(el => {
            el.addEventListener('mouseenter', () => this.handleHover('image'));
            el.addEventListener('mouseleave', () => this.handleHoverEnd());
        });
        
        // Navigation elements
        document.querySelectorAll('.nav-link, .nav-social-icon').forEach(el => {
            el.addEventListener('mouseenter', () => this.handleHover('nav'));
            el.addEventListener('mouseleave', () => this.handleHoverEnd());
        });
    }
    
    animate() {
        this._x += (this.endX - this._x) / this.delay;
        this._y += (this.endY - this._y) / this.delay;
        
        this.$outline.style.left = this._x + 'px';
        this.$outline.style.top = this._y + 'px';
        
        this.$dot.style.left = this.endX + 'px';
        this.$dot.style.top = this.endY + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
    
    showCursor() {
        this.cursorVisible = true;
        this.$dot.style.opacity = '1';
        this.$outline.style.opacity = '1';
    }
    
    hideCursor() {
        this.cursorVisible = false;
        this.$dot.style.opacity = '0';
        this.$outline.style.opacity = '0';
    }
    
    handleHover(type) {
        this.isHovering = true;
        this.clearStates();
        
        switch(type) {
            case 'link':
                this.$dot.classList.add('hover');
                this.$outline.classList.add('hover');
                break;
            case 'text':
                this.$dot.classList.add('text');
                this.$outline.classList.add('text');
                break;
            case 'image':
                this.$dot.classList.add('hover');
                this.$outline.classList.add('hover');
                break;
            case 'nav':
                this.$dot.classList.add('hover');
                this.$outline.classList.add('hover');
                break;
        }
    }
    
    handleHoverEnd() {
        this.isHovering = false;
        this.clearStates();
    }
    
    handleClick() {
        this.isClicking = true;
        this.clearStates();
        this.$dot.classList.add('click');
        this.$outline.classList.add('click');
    }
    
    handleClickEnd() {
        this.isClicking = false;
        setTimeout(() => {
            if (!this.isClicking) {
                this.clearStates();
            }
        }, 150);
    }
    
    handleTextSelection() {
        const selection = window.getSelection();
        this.isOnText = selection.toString().length > 0;
        
        if (this.isOnText) {
            this.clearStates();
            this.$dot.classList.add('text');
            this.$outline.classList.add('text');
        } else if (!this.isHovering) {
            this.clearStates();
        }
    }
    
    handlePageLoad() {
        this.isLoading = false;
        this.clearStates();
    }
    
    handleResize() {
        // Recalculate positions if needed
        this.endX = Math.min(this.endX, window.innerWidth);
        this.endY = Math.min(this.endY, window.innerHeight);
    }
    
    clearStates() {
        this.$dot.classList.remove('hover', 'click', 'text', 'loading');
        this.$outline.classList.remove('hover', 'click', 'text', 'loading');
    }
    
    // Public methods for external control
    setLoading(loading) {
        this.isLoading = loading;
        if (loading) {
            this.clearStates();
            this.$dot.classList.add('loading');
            this.$outline.classList.add('loading');
        } else {
            this.clearStates();
        }
    }
    
    setCustomState(className) {
        this.clearStates();
        this.$dot.classList.add(className);
        this.$outline.classList.add(className);
    }
}

// Initialize cursor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on desktop
    if (window.innerWidth > 768) {
        new EnhancedCursor();
    }
});

// Re-initialize on resize if switching between mobile/desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && !document.querySelector('.cursor-dot').style.display) {
        new EnhancedCursor();
    }
});
