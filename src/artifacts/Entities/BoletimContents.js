"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var _1 = require(".");
var BoletimContents = /** @class */ (function () {
    function BoletimContents() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], BoletimContents.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ length: 200, nullable: false }),
        __metadata("design:type", String)
    ], BoletimContents.prototype, "text");
    __decorate([
        (0, typeorm_1.Column)({ length: 500, nullable: false }),
        __metadata("design:type", String)
    ], BoletimContents.prototype, "url");
    __decorate([
        (0, typeorm_1.Column)({ length: 60, nullable: false }),
        __metadata("design:type", String)
    ], BoletimContents.prototype, "tipo");
    __decorate([
        (0, typeorm_1.ManyToOne)(function (_type) { return _1.Boletim; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", _1.Boletim)
    ], BoletimContents.prototype, "boletim");
    BoletimContents = __decorate([
        (0, typeorm_1.Entity)("BoletimContents")
    ], BoletimContents);
    return BoletimContents;
}());
exports["default"] = BoletimContents;
//# sourceMappingURL=BoletimContents.js.map