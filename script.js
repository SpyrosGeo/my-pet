class AnimationAttributes {
    constructor(frames, positionY, speed) {
        this.frames = frames;
        this.positionY = positionY;
        this.speed = speed;
    }
}

class BaseAnimation {
    constructor(attributes) {
        this.attributes = attributes;
        this.frameX = 0;
    }

    updateFrame() {
        this.frameX = (this.frameX + 1) % this.attributes.frames;
    }
}

class PlayDeadAnimation extends BaseAnimation {
    updateFrame() {
        this.frameX = this.frameX >= this.attributes.frames - 1 ? 5 : this.frameX + 1;
    }
}

class CanvasAnimator {
    constructor(canvasId, selectorId, spriteDimensions, imageSources) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.selector = document.getElementById(selectorId);
        this.spriteWidth = spriteDimensions.width;
        this.spriteHeight = spriteDimensions.height;
        this.gameFrame = 0;

        this.background = new Image();
        this.background.src = imageSources.background;
        this.petImage = new Image();
        this.petImage.src = imageSources.pet;

        const animationConfig = {
            idle: new AnimationAttributes(6, 0, 5),
            jump: new AnimationAttributes(6, 1, 2),
            run: new AnimationAttributes(8, 3, 6),
            dizzy: new AnimationAttributes(10, 4, 12),
            sit: new AnimationAttributes(4, 5, 10),
            playDead: new AnimationAttributes(12, 8, 9)
        };

        this.selectedAnimation = this.selector.value;
        this.currentAnimation = this.selectedAnimation === 'playDead' ?
            new PlayDeadAnimation(animationConfig[this.selectedAnimation]) :
            new BaseAnimation(animationConfig[this.selectedAnimation]);

        this.selector.addEventListener('change', (event) => {
            this.selectedAnimation = event.target.value;
            this.currentAnimation = this.selectedAnimation === 'playDead' ?
                new PlayDeadAnimation(animationConfig[this.selectedAnimation]) :
                new BaseAnimation(animationConfig[this.selectedAnimation]);
        });

        this.canvas.width = 600;
        this.canvas.height = 600;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(
            this.petImage,
            this.currentAnimation.frameX * this.spriteWidth,
            this.currentAnimation.attributes.positionY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight
        );
    }

    updateFrame() {
        if (this.gameFrame % this.currentAnimation.attributes.speed === 0) {
            this.currentAnimation.updateFrame();
        }
    }

    animate() {
        this.draw();
        this.updateFrame();
        this.gameFrame++;
        requestAnimationFrame(() => this.animate());
    }
}

const spriteDimensions = { width: 575, height: 523 };
const imageSources = { pet: 'shadow_dog.png', background: 'background.jpeg' };

const animator = new CanvasAnimator("canvas1", "animation", spriteDimensions, imageSources);
animator.animate();
