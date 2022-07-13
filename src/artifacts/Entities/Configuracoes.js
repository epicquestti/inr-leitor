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
var Configuracoes = /** @class */ (function () {
    function Configuracoes() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Configuracoes.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Configuracoes.prototype, "instanceName");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], Configuracoes.prototype, "lastBeId");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], Configuracoes.prototype, "lastClassId");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Boolean)
    ], Configuracoes.prototype, "notifyClassificador");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Boolean)
    ], Configuracoes.prototype, "notifyBoletim");
    Configuracoes = __decorate([
        (0, typeorm_1.Entity)("Configuracoes")
    ], Configuracoes);
    return Configuracoes;
}());
exports["default"] = Configuracoes;
//# sourceMappingURL=Configuracoes.js.map