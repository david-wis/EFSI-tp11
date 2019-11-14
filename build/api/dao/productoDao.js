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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var resultado_1 = require("../model/resultado");
var bd_1 = __importDefault(require("../bd"));
var ProductoDAO = /** @class */ (function () {
    function ProductoDAO() {
    }
    ProductoDAO.AgregarProducto = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var result, exito;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = resultado_1.Resultado.Exito;
                        exito = true;
                        exito = exito && ProductoDAO.Validar(producto.nombre, "string");
                        exito = exito && ProductoDAO.Validar(producto.descripcion, "string");
                        //exito = BD.Validar(producto.imagen);
                        exito = exito && ProductoDAO.Validar(producto.precio, "number");
                        exito = exito && ProductoDAO.Validar(producto.stock, "number");
                        if (!exito) return [3 /*break*/, 2];
                        //producto.convertirImgABlob();
                        return [4 /*yield*/, bd_1.default.AgregarProducto(producto).then(function (ok) {
                                result = ok ? resultado_1.Resultado.Exito : resultado_1.Resultado.NombreRepetido;
                            })];
                    case 1:
                        //producto.convertirImgABlob();
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        result = resultado_1.Resultado.Error;
                        _a.label = 3;
                    case 3: return [2 /*return*/, result];
                }
            });
        });
    };
    ProductoDAO.Validar = function (valor, tipoEsperado) {
        var exito = false;
        switch (tipoEsperado) {
            case "number":
                if (typeof valor === "number") {
                    console.log("se esperaba un numero y es un numero");
                    if (valor >= 0) {
                        exito = true;
                    }
                }
                break;
            case "string":
                if (typeof valor === "string") {
                    if (valor.trim() !== "") {
                        exito = true;
                    }
                }
                break;
            default:
                exito = true;
                break;
        }
        return exito;
    };
    ProductoDAO.ModificarProducto = function (producto, nombreViejo) {
        var result = resultado_1.Resultado.Exito;
        var exito = true;
        exito = exito && ProductoDAO.Validar(producto.nombre, "string");
        exito = exito && ProductoDAO.Validar(producto.descripcion, "string");
        //exito = BD.Validar(producto.imagen);
        exito = exito && ProductoDAO.Validar(producto.precio, "number");
        exito = exito && ProductoDAO.Validar(producto.stock, "number");
        exito = exito && ProductoDAO.Validar(nombreViejo, "string");
        if (exito) {
            if (bd_1.default.ModificarProducto(producto, nombreViejo)) {
                result = resultado_1.Resultado.Exito;
            }
            else {
                result = resultado_1.Resultado.NombreRepetido;
            }
        }
        else {
            result = resultado_1.Resultado.Error;
        }
        return result;
    };
    ProductoDAO.EliminarProducto = function (nombre) {
        var bExito = false;
        if (ProductoDAO.Validar(nombre, "string")) {
            bd_1.default.EliminarProducto(nombre);
            bExito = true;
        }
        return bExito;
    };
    ProductoDAO.ObtenerProducto = function (nombre) {
        var producto = null;
        if (ProductoDAO.Validar(nombre, "string")) {
            producto = bd_1.default.ObtenerProducto(nombre);
        }
        return producto;
    };
    ProductoDAO.ObtenerTodos = function () {
        //let productos : IProducto[] = [];
        var promesaProds = bd_1.default.ObtenerTodos();
        return promesaProds;
    };
    return ProductoDAO;
}());
exports.default = ProductoDAO;
