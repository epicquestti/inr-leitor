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
        (0, typeorm_1.Column)({ nullable: false }),
        __metadata("design:type", Date)
    ], Configuracoes.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.Column)({ nullable: false }),
        __metadata("design:type", String)
    ], Configuracoes.prototype, "text");
    __decorate([
        (0, typeorm_1.Column)({ nullable: false, length: 1 }),
        __metadata("design:type", String)
    ], Configuracoes.prototype, "type");
    __decorate([
        (0, typeorm_1.Column)({ nullable: false }),
        __metadata("design:type", Boolean)
    ], Configuracoes.prototype, "readed");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], Configuracoes.prototype, "relatedDocumentId");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Configuracoes.prototype, "version");
    Configuracoes = __decorate([
        (0, typeorm_1.Entity)("Notificacoes")
    ], Configuracoes);
    return Configuracoes;
}());
exports["default"] = Configuracoes;
//# sourceMappingURL=Notificacoes.js.map