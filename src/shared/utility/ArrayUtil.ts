math.randomseed(tick() + os.time());
namespace ArrayUtil {
    export const randomElement = <T>(arr: T[]): T => arr[(new Random).NextInteger(0, arr.size() - 1)];
}

export = ArrayUtil;
