package com.example.controller;

import com.example.dto.ResponseModel;
import com.example.dto.request.CheckingAccountRequest;
import com.example.dto.request.OperationRequest;
import com.example.dto.response.CheckingAccountResponseModel;
import com.example.entity.CheckingAccount;
import com.example.services.CheckingAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/checking")
@CrossOrigin(origins = "*")
public class CheckingAccountController {
    final
    CheckingAccountService checkingAccountService;

    public CheckingAccountController(CheckingAccountService checkingAccountService) {
        this.checkingAccountService = checkingAccountService;
    }
    @PostMapping("/create")
    public ResponseEntity<?> createCheckingAccount(@RequestBody CheckingAccountRequest checkingAccountRequest){
        return checkingAccountService.create(checkingAccountRequest);
    }
    //@PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/update")
    public ResponseEntity<?> deleteCheckingAccount(@RequestBody CheckingAccountRequest checkingAccountRequest){
        return checkingAccountService.update(checkingAccountRequest);
    }
    @PostMapping("/withdraw")
    public ResponseModel<CheckingAccount> withdraw(@RequestBody OperationRequest operationRequest){
        return checkingAccountService.withdraw(operationRequest);
    }
    @PostMapping("/deposit")
    public ResponseModel<CheckingAccount>deposit(@RequestBody OperationRequest operationRequest){
        return checkingAccountService.deposit(operationRequest);
    }
    @GetMapping("/{id}")
    public ResponseModel<CheckingAccountResponseModel> getCheckingAccount(@PathVariable Long id){
        return checkingAccountService.getCheckingAccount(id);
    }



}