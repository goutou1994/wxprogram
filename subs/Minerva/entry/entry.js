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
    const defaultData = {
        problemSetInfos: [],
        showSelectProblemSet: false,
        problemList: [],
        currentProblemSet: ""
    };
    create_1.default.Page(store_1.default, {
        data: defaultData,
        onLoad() {
            return __awaiter(this, void 0, void 0, function* () {
                const db = util_1.getDB(app);
                const res = yield db.collection('ProblemSets').get();
                this.setData({
                    problemSetInfos: res.data,
                    problemList: res.data.map((item) => item.label),
                    currentProblemSet: res.data[0].label
                });
            });
        },
        showPopup() {
            this.setData({ showSelectProblemSet: true });
        },
        onClose() {
            this.setData({ showSelectProblemSet: false });
        },
        onChooseProblemSet({ detail: { value } }) {
            this.setData({
                currentProblemSet: value
            });
            this.onClose();
        },
        onStart() {
            if (this.data.currentProblemSet) {
                const problemSetInfo = util_1.find(this.data.problemSetInfos, (item) => item.name === this.data.currentProblemSet);
                if (!problemSetInfo) {
                    return;
                }
                this.store.data.problemSetInfos = {
                    type: Minerva.ProblemType.SingleSelect,
                    name: problemSetInfo.name,
                    count: problemSetInfo.count
                };
                wx.navigateTo({
                    url: '../main/main?restart=true'
                });
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9taW5pcHJvZ3JhbS9zdWJzL01pbmVydmEvZW50cnkvZW50cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxrREFBMEM7QUFDMUMsb0NBQTRCO0FBQzVCLDhDQUFpRDtBQUlqRDtJQUNFLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0lBUzVCLE1BQU0sV0FBVyxHQUFjO1FBQzdCLGVBQWUsRUFBRSxFQUFFO1FBQ25CLG9CQUFvQixFQUFFLEtBQUs7UUFDM0IsV0FBVyxFQUFFLEVBQUU7UUFDZixpQkFBaUIsRUFBRSxFQUFFO0tBQ3RCLENBQUM7SUFFRixnQkFBTSxDQUFDLElBQUksQ0FBQyxlQUFLLEVBQUU7UUFDakIsSUFBSSxFQUFFLFdBQVc7UUFDWCxNQUFNOztnQkFDVixNQUFNLEVBQUUsR0FBRyxZQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sR0FBRyxHQUErQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsZUFBZSxFQUFFLEdBQUcsQ0FBQyxJQUFJO29CQUN6QixXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUE0QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUN2RSxpQkFBaUIsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7aUJBQ3JDLENBQUMsQ0FBQztZQUNMLENBQUM7U0FBQTtRQUNELFNBQVM7WUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsT0FBTztZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFDRCxrQkFBa0IsQ0FBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLEtBQUssRUFBQyxFQUEyQjtZQUMzRCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLGlCQUFpQixFQUFFLEtBQUs7YUFDekIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFDRCxPQUFPO1lBQ0wsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUMvQixNQUFNLGNBQWMsR0FDaEIsV0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBNEIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2pILElBQUksQ0FBQyxjQUFjLEVBQUU7b0JBRW5CLE9BQU87aUJBQ1I7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHO29CQUNoQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxZQUFZO29CQUN0QyxJQUFJLEVBQUUsY0FBYyxDQUFDLElBQUk7b0JBQ3pCLEtBQUssRUFBRSxjQUFjLENBQUMsS0FBSztpQkFDNUIsQ0FBQztnQkFDRixFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNaLEdBQUcsRUFBRSwyQkFBMkI7aUJBQ2pDLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQztLQUNGLENBQUMsQ0FBQTtDQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZSBmcm9tICcuLi8uLi8uLi91dGlscy9jcmVhdGUnXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vc3RvcmUnXG5pbXBvcnQgeyBnZXREQiwgZmluZCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3V0aWwnXG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi8uLi9hcHAnXG5cbi8vIOiOt+WPluW6lOeUqOWunuS+i1xue1xuICBjb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXG5cbiAgdHlwZSBEYXRhU3RvcmUgPSB7XG4gICAgcHJvYmxlbVNldEluZm9zOiBBcnJheTxNaW5lcnZhLlByb2JsZW1TZXRJbmZvPixcbiAgICBzaG93U2VsZWN0UHJvYmxlbVNldDogQm9vbGVhbixcbiAgICBwcm9ibGVtTGlzdDogQXJyYXk8c3RyaW5nPixcbiAgICBjdXJyZW50UHJvYmxlbVNldDogc3RyaW5nXG4gIH07XG5cbiAgY29uc3QgZGVmYXVsdERhdGE6IERhdGFTdG9yZSA9IHtcbiAgICBwcm9ibGVtU2V0SW5mb3M6IFtdLFxuICAgIHNob3dTZWxlY3RQcm9ibGVtU2V0OiBmYWxzZSxcbiAgICBwcm9ibGVtTGlzdDogW10sXG4gICAgY3VycmVudFByb2JsZW1TZXQ6IFwiXCJcbiAgfTtcblxuICBjcmVhdGUuUGFnZShzdG9yZSwge1xuICAgIGRhdGE6IGRlZmF1bHREYXRhLFxuICAgIGFzeW5jIG9uTG9hZCgpIHtcbiAgICAgIGNvbnN0IGRiID0gZ2V0REIoYXBwKTtcbiAgICAgIGNvbnN0IHJlczogUmVzdWx0PEFycmF5PE1pbmVydmEuUHJvYmxlbVNldEluZm8+PiA9IDxhbnk+YXdhaXQgZGIuY29sbGVjdGlvbignUHJvYmxlbVNldHMnKS5nZXQoKTtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHByb2JsZW1TZXRJbmZvczogcmVzLmRhdGEsXG4gICAgICAgIHByb2JsZW1MaXN0OiByZXMuZGF0YS5tYXAoKGl0ZW06IE1pbmVydmEuUHJvYmxlbVNldEluZm8pID0+IGl0ZW0ubGFiZWwpLFxuICAgICAgICBjdXJyZW50UHJvYmxlbVNldDogcmVzLmRhdGFbMF0ubGFiZWxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgc2hvd1BvcHVwKCkge1xuICAgICAgdGhpcy5zZXREYXRhKHsgc2hvd1NlbGVjdFByb2JsZW1TZXQ6IHRydWUgfSk7XG4gICAgfSxcbiAgICBvbkNsb3NlKCkge1xuICAgICAgdGhpcy5zZXREYXRhKHsgc2hvd1NlbGVjdFByb2JsZW1TZXQ6IGZhbHNlIH0pO1xuICAgIH0sXG4gICAgb25DaG9vc2VQcm9ibGVtU2V0KHtkZXRhaWw6e3ZhbHVlfX06IHtkZXRhaWw6e3ZhbHVlOiBzdHJpbmd9fSkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgY3VycmVudFByb2JsZW1TZXQ6IHZhbHVlXG4gICAgICB9KTtcbiAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgIH0sXG4gICAgb25TdGFydCgpIHtcbiAgICAgIGlmICh0aGlzLmRhdGEuY3VycmVudFByb2JsZW1TZXQpIHtcbiAgICAgICAgY29uc3QgcHJvYmxlbVNldEluZm9cbiAgICAgICAgICA9IGZpbmQodGhpcy5kYXRhLnByb2JsZW1TZXRJbmZvcywgKGl0ZW06IE1pbmVydmEuUHJvYmxlbVNldEluZm8pID0+IGl0ZW0ubmFtZSA9PT0gdGhpcy5kYXRhLmN1cnJlbnRQcm9ibGVtU2V0KTtcbiAgICAgICAgaWYgKCFwcm9ibGVtU2V0SW5mbykge1xuICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yZS5kYXRhLnByb2JsZW1TZXRJbmZvcyA9IHtcbiAgICAgICAgICB0eXBlOiBNaW5lcnZhLlByb2JsZW1UeXBlLlNpbmdsZVNlbGVjdCwvLyBUT0RPXG4gICAgICAgICAgbmFtZTogcHJvYmxlbVNldEluZm8ubmFtZSxcbiAgICAgICAgICBjb3VudDogcHJvYmxlbVNldEluZm8uY291bnRcbiAgICAgICAgfTtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi4vbWFpbi9tYWluP3Jlc3RhcnQ9dHJ1ZSdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG4iXX0=