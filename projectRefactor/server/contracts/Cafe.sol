pragma solidity ^0.4.17;

contract Cafe {
    
    string tipoCafe;
    string factorNaturaleza;
    string factorHumano;
    string factorTradicion;
    uint cantidadCafe;
    address owner;
    
    function Cafe(string _tipoCafe, string _factorNaturaleza, string _factorHumano, string _factorTradicion, uint _cantidadCafe) public {
        owner = msg.sender;
        setTipoCafe(_tipoCafe);
        setFactorNaturaleza(_factorNaturaleza);
        setFactorHumano(_factorHumano);
        setFactorTradicion(_factorTradicion);
        setCantidadCafe(_cantidadCafe);
        emit Print(_tipoCafe,_factorNaturaleza,_factorHumano,_factorTradicion,_cantidadCafe);
    }
    
    event Print(string _tipoCafe, string _factorNaturaleza,string _factorHumano, string _factorTradicion,uint _cantidadCafe);

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    function setTipoCafe (string _tipoCafe) onlyOwner public {
        tipoCafe = _tipoCafe;
    }
    
    function setFactorNaturaleza (string _factorNaturaleza) onlyOwner public {
        factorNaturaleza = _factorNaturaleza;
    }
    
    function setFactorHumano (string _factorHumano) onlyOwner public {
        factorHumano = _factorHumano;
    }
    
    function setFactorTradicion (string _factorTradicion) onlyOwner public {
        factorTradicion = _factorTradicion;
    }
    
    function setCantidadCafe (uint _cantidadCafe) onlyOwner public {
        cantidadCafe = _cantidadCafe;
    }
    
    function getTipoCafe () view public returns(string) {
        return tipoCafe;
    }
    
    function getFactorNaturaleza () view public returns(string) {
        return factorNaturaleza;
    }
    
    function getFactorHumano () view public returns(string) {
        return factorHumano;
    }
    
    function getFactorTradicion () view public returns(string) {
        return factorTradicion;
    }
    
    function getCantidadCafe () view public returns(uint) {
        return cantidadCafe;
    }

}
