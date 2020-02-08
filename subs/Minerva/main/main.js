"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("../../../utils/create");
const store_1 = require("../store");
const util_1 = require("../../../utils/util");
{
    const app = getApp();
    create_1.default.Page(store_1.default, {
        use: ['progress'],
        data: {
            nextCacheTask: function () { },
            cacheTask: null
        },
        onLoad(options) {
            if (options.restart === 'true') {
                this.store.data.problemCache = [];
                this.manageProblemCache(20, 0);
            }
        },
        nextProblem() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.store.data.progress.count >= this.store.data.problemSetInfo.count) {
                }
                this.data.nextCacheTask();
                if (this.store.data.problemCache.length < 1) {
                    yield this.cacheTask;
                }
                const p = this.store.data.problemCache.unshift();
                this.store.data.progress.count++;
                this.store.data.progress.problem = p.problem;
                this.store.data.progress.options = [p.option1, p.option2, p.option3, p.option4];
                this.store.data.progress.answer = p.answer.charCodeAt() - 65;
            });
        },
        manageProblemCache(size, type) {
            if (type === 0) {
                const f = function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (this.store.data.problemCache.length < size / 2) {
                            this.data.cacheTask = this.pullProblems(this.store.data.progress.count + 1, size / 2);
                            const problems = yield this.data.cacheTask;
                            if (problems.length + this.store.data.progress.count >= this.store.data.problemSetInfo.count) {
                                this.data.nextCacheTask = function () { };
                            }
                            this.store.data.problemCache = this.store.data.problemCache.concat(problems);
                        }
                    });
                };
                this.data.nextCacheTask = f.bind(this);
            }
        },
        pullProblem(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const db = util_1.getDB(app);
                const res = yield db.collection(this.store.data.problemSetName).where({
                    _id: db.command.eq(id)
                }).get();
                return res.data[0];
            });
        },
        pullProblems(start, count) {
            return __awaiter(this, void 0, void 0, function* () {
                const db = util_1.getDB(app);
                const res = yield db.collection(this.store.data.problemSetName)
                    .where({
                    '_id': db.command.gte(start)
                })
                    .orderBy('_id', "asc")
                    .limit(count)
                    .get();
                return res.data;
            });
        },
        onChoose: function (e) {
            this.setData({
                chosen: e.currentTarget.dataset.id
            });
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL21pbmlwcm9ncmFtL3N1YnMvTWluZXJ2YS9tYWluL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxrREFBMEM7QUFDMUMsb0NBQTRCO0FBQzVCLDhDQUEyQztBQUkzQztJQUNFLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0lBRTVCLGdCQUFNLENBQUMsSUFBSSxDQUFDLGVBQUssRUFBRTtRQUNqQixHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDakIsSUFBSSxFQUFFO1lBQ0osYUFBYSxFQUFFLGNBQVksQ0FBQztZQUM1QixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELE1BQU0sQ0FBQyxPQUEwQjtZQUMvQixJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFO2dCQUU5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQztRQUNLLFdBQVc7O2dCQUNmLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2lCQUUzRTtnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMxQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUMzQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQ3RCO2dCQUNELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FB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ckIsS0FBSyxDQUFDLEtBQUssQ0FBQztxQkFDWixHQUFHLEVBQUUsQ0FBQztnQkFDVCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDbEIsQ0FBQztTQUFBO1FBQ0QsUUFBUSxFQUFFLFVBQVMsQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLE1BQU0sRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2FBQ25DLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRixDQUFDLENBQUE7Q0FDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGUgZnJvbSAnLi4vLi4vLi4vdXRpbHMvY3JlYXRlJ1xuaW1wb3J0IHN0b3JlIGZyb20gJy4uL3N0b3JlJ1xuaW1wb3J0IHsgZ2V0REIgfSBmcm9tICcuLi8uLi8uLi91dGlscy91dGlsJ1xuaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vLi4vYXBwJ1xuXG4vLyDojrflj5blupTnlKjlrp7kvotcbntcbiAgY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxuXG4gIGNyZWF0ZS5QYWdlKHN0b3JlLCB7XG4gICAgdXNlOiBbJ3Byb2dyZXNzJ10sXG4gICAgZGF0YToge1xuICAgICAgbmV4dENhY2hlVGFzazogZnVuY3Rpb24oKSB7fSxcbiAgICAgIGNhY2hlVGFzazogbnVsbFxuICAgIH0sXG4gICAgb25Mb2FkKG9wdGlvbnM6IHtyZXN0YXJ0OiBzdHJpbmd9KSB7XG4gICAgICBpZiAob3B0aW9ucy5yZXN0YXJ0ID09PSAndHJ1ZScpIHtcbiAgICAgICAgLy8gVE9ETyByZWZyZXNoXG4gICAgICAgIHRoaXMuc3RvcmUuZGF0YS5wcm9ibGVtQ2FjaGUgPSBbXTtcbiAgICAgICAgdGhpcy5tYW5hZ2VQcm9ibGVtQ2FjaGUoMjAsIDApO1xuICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgbmV4dFByb2JsZW0oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICBpZiAodGhpcy5zdG9yZS5kYXRhLnByb2dyZXNzLmNvdW50ID49IHRoaXMuc3RvcmUuZGF0YS5wcm9ibGVtU2V0SW5mby5jb3VudCkge1xuICAgICAgICAvLyBUT0RPIGNvbXBsZXRlXG4gICAgICB9XG4gICAgICB0aGlzLmRhdGEubmV4dENhY2hlVGFzaygpO1xuICAgICAgaWYgKHRoaXMuc3RvcmUuZGF0YS5wcm9ibGVtQ2FjaGUubGVuZ3RoIDwgMSkge1xuICAgICAgICBhd2FpdCB0aGlzLmNhY2hlVGFzaztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHAgPSB0aGlzLnN0b3JlLmRhdGEucHJvYmxlbUNhY2hlLnVuc2hpZnQoKTtcbiAgICAgIHRoaXMuc3RvcmUuZGF0YS5wcm9ncmVzcy5jb3VudCsrO1xuICAgICAgdGhpcy5zdG9yZS5kYXRhLnByb2dyZXNzLnByb2JsZW0gPSBwLnByb2JsZW07XG4gICAgICB0aGlzLnN0b3JlLmRhdGEucHJvZ3Jlc3Mub3B0aW9ucyA9IFtwLm9wdGlvbjEsIHAub3B0aW9uMiwgcC5vcHRpb24zLCBwLm9wdGlvbjRdO1xuICAgICAgdGhpcy5zdG9yZS5kYXRhLnByb2dyZXNzLmFuc3dlciA9IHAuYW5zd2VyLmNoYXJDb2RlQXQoKSAtIDY1O1xuICAgIH0sXG4gICAgbWFuYWdlUHJvYmxlbUNhY2hlKHNpemU6IG51bWJlciwgdHlwZTogbnVtYmVyKSB7XG4gICAgICBpZiAodHlwZSA9PT0gMCkge1xuICAgICAgICBjb25zdCBmID0gYXN5bmMgZnVuY3Rpb24odGhpczogYW55KSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RvcmUuZGF0YS5wcm9ibGVtQ2FjaGUubGVuZ3RoIDwgc2l6ZSAvIDIpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5jYWNoZVRhc2sgPSB0aGlzLnB1bGxQcm9ibGVtcyh0aGlzLnN0b3JlLmRhdGEucHJvZ3Jlc3MuY291bnQgKyAxLCBzaXplIC8gMik7XG4gICAgICAgICAgICBjb25zdCBwcm9ibGVtcyA9IGF3YWl0IHRoaXMuZGF0YS5jYWNoZVRhc2s7XG4gICAgICAgICAgICBpZiAocHJvYmxlbXMubGVuZ3RoICsgdGhpcy5zdG9yZS5kYXRhLnByb2dyZXNzLmNvdW50ID49IHRoaXMuc3RvcmUuZGF0YS5wcm9ibGVtU2V0SW5mby5jb3VudCkge1xuICAgICAgICAgICAgICB0aGlzLmRhdGEubmV4dENhY2hlVGFzayA9IGZ1bmN0aW9uKCkge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmRhdGEucHJvYmxlbUNhY2hlID0gdGhpcy5zdG9yZS5kYXRhLnByb2JsZW1DYWNoZS5jb25jYXQocHJvYmxlbXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEubmV4dENhY2hlVGFzayA9IGYuYmluZCh0aGlzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIHB1bGxQcm9ibGVtKGlkOiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IGRiID0gZ2V0REIoYXBwKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24odGhpcy5zdG9yZS5kYXRhLnByb2JsZW1TZXROYW1lKS53aGVyZSh7XG4gICAgICAgIF9pZDogZGIuY29tbWFuZC5lcShpZClcbiAgICAgIH0pLmdldCgpO1xuICAgICAgcmV0dXJuIHJlcy5kYXRhWzBdO1xuICAgIH0sXG4gICAgYXN5bmMgcHVsbFByb2JsZW1zKHN0YXJ0OiBudW1iZXIsIGNvdW50OiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IGRiID0gZ2V0REIoYXBwKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24odGhpcy5zdG9yZS5kYXRhLnByb2JsZW1TZXROYW1lKVxuICAgICAgICAud2hlcmUoe1xuICAgICAgICAgICdfaWQnOiBkYi5jb21tYW5kLmd0ZShzdGFydClcbiAgICAgICAgfSlcbiAgICAgICAgLm9yZGVyQnkoJ19pZCcsIFwiYXNjXCIpXG4gICAgICAgIC5saW1pdChjb3VudClcbiAgICAgICAgLmdldCgpO1xuICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgIH0sXG4gICAgb25DaG9vc2U6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGNob3NlbjogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgIH0pXG4gICAgfVxuICB9KVxufVxuIl19