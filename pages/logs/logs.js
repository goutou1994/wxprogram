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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21pbmlwcm9ncmFtL3BhZ2VzL2xvZ3MvbG9ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJDQUE2QztBQUM3QywrQ0FBdUM7QUFDdkMsNkNBQXFDO0FBRXJDLGdCQUFNLENBQUMsSUFBSSxDQUFDLGVBQUssRUFBRTtJQUNqQixHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDYixNQUFNLEVBQUU7UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQzNFLE9BQU8saUJBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ2xDLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vbG9ncy5qc1xuaW1wb3J0IHsgZm9ybWF0VGltZSB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnXG5pbXBvcnQgY3JlYXRlIGZyb20gJy4uLy4uL3V0aWxzL2NyZWF0ZSdcbmltcG9ydCBzdG9yZSBmcm9tICcuLi8uLi9zdG9yZS9pbmRleCdcblxuY3JlYXRlLlBhZ2Uoc3RvcmUsIHtcbiAgdXNlOiBbJ2xvZ3MnXSxcbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zdG9yZS5kYXRhLmxvZ3MgPSAod3guZ2V0U3RvcmFnZVN5bmMoJ2xvZ3MnKSB8fCBbXSkubWFwKChsb2c6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIGZvcm1hdFRpbWUobmV3IERhdGUobG9nKSlcbiAgICB9KVxuICB9XG59KVxuIl19