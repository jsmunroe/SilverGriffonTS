namespace Lightspeed.Utils {
    export class Random {
        public static Current: Random = new Random();

        public getBetween(min: number, max: number) {
            return (max - min) * this.next() + min;
        }

        public getIntBetween(min: number, max: number) {
            return Math.floor(this.getBetween(min, max));
        }

        public next(factor?: number) {
            return Math.random() * (factor || 1);
        } 

        public nextInt(upperBound?: number) {
            return Math.floor(Math.random() * (upperBound || 10));
        }

        public pick<TItem>(array: TItem[], weight?: (element:TItem) => number): TItem {
            if (!weight) {
                var index = this.nextInt(array.length);
                return array[index];
            }

            var sum = this.sum(array, weight);
            var random = this.next(sum);
            var cumulative = 0;
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                cumulative += weight(element);

                if (random <= cumulative) {
                    return element;
                }
            }

            return array[array.length-1];
        }

        private sum<TItem>(array: TItem[], weight: (element:TItem) => number): number {
            var sum = 0;
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                sum += weight(element);
            }
            return sum;
        }
    }
}