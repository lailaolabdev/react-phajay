/**
 * Simple EventEmitter implementation for browser compatibility
 * Replaces Node.js EventEmitter to avoid require() issues in browser
 */
export class SimpleEventEmitter {
  private events: { [key: string]: Function[] } = {};

  /**
   * Add an event listener
   */
  on(event: string, listener: Function): this {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return this;
  }

  /**
   * Add a one-time event listener
   */
  once(event: string, listener: Function): this {
    const onceWrapper = (...args: any[]) => {
      this.off(event, onceWrapper);
      listener.apply(this, args);
    };
    return this.on(event, onceWrapper);
  }

  /**
   * Remove an event listener
   */
  off(event: string, listener: Function): this {
    if (!this.events[event]) return this;
    
    this.events[event] = this.events[event].filter(l => l !== listener);
    return this;
  }

  /**
   * Remove all listeners for an event
   */
  removeAllListeners(event?: string): this {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
    return this;
  }

  /**
   * Emit an event
   */
  emit(event: string, ...args: any[]): boolean {
    if (!this.events[event]) return false;
    
    this.events[event].forEach(listener => {
      try {
        listener.apply(this, args);
      } catch (error) {
        console.error('EventEmitter error:', error);
      }
    });
    
    return true;
  }

  /**
   * Get listener count for an event
   */
  listenerCount(event: string): number {
    return this.events[event] ? this.events[event].length : 0;
  }

  /**
   * Get all listeners for an event
   */
  listeners(event: string): Function[] {
    return this.events[event] ? [...this.events[event]] : [];
  }
}
