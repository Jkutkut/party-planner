class Model {
    protected log(...args: any[]): void {
        console.log(this.constructor.name, ...args);
    }

    protected error(...args: any[]): void {
        console.error(this.constructor.name, ...args);
    }

    protected warn(...args: any[]): void {
        console.warn(this.constructor.name, ...args);
    }

    protected info(...args: any[]): void {
        console.info(this.constructor.name, ...args);
    }

    protected debug(...args: any[]): void {
        console.debug(this.constructor.name, ...args);
    }

    protected trace(...args: any[]): void {
        console.trace(this.constructor.name, ...args);
    }

    // ----------------------------

    protected static log(...args: any[]): void {
        console.log(this.name, ...args);
    }

    protected static error(...args: any[]): void {
        console.error(this.name, ...args);
    }

    protected static warn(...args: any[]): void {
        console.warn(this.name, ...args);
    }

    protected static info(...args: any[]): void {
        console.info(this.name, ...args);
    }

    protected static debug(...args: any[]): void {
        console.debug(this.name, ...args);
    }

    protected static trace(...args: any[]): void {
        console.trace(this.name, ...args);
    }

}

export default Model;