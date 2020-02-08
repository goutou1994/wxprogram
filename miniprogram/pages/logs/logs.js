"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../utils/util");
const create_1 = require("../../utils/create");
const index_1 = require("../../store/index");
create_1.default.Page(index_1.default, {
    use: ['logs'],
    onLoad: function () {
        this.store.data.logs = (wx.getStorageSync('logs') || []).map((log) => {
            return util_1.formatTime(new Date(log));
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBNkM7QUFDN0MsK0NBQXVDO0FBQ3ZDLDZDQUFxQztBQUVyQyxnQkFBTSxDQUFDLElBQUksQ0FBQyxlQUFLLEVBQUU7SUFDakIsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ2IsTUFBTSxFQUFFO1FBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUMzRSxPQUFPLGlCQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNsQyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL2xvZ3MuanNcbmltcG9ydCB7IGZvcm1hdFRpbWUgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJ1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuLi8uLi91dGlscy9jcmVhdGUnXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vLi4vc3RvcmUvaW5kZXgnXG5cbmNyZWF0ZS5QYWdlKHN0b3JlLCB7XG4gIHVzZTogWydsb2dzJ10sXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RvcmUuZGF0YS5sb2dzID0gKHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dzJykgfHwgW10pLm1hcCgobG9nOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBmb3JtYXRUaW1lKG5ldyBEYXRlKGxvZykpXG4gICAgfSlcbiAgfVxufSlcbiJdfQ==