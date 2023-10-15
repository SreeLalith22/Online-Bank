package com.example.controller;

import com.example.dto.request.AnnualInterestRequest;
import com.example.services.AnnualAPRService;
import com.example.services.AnnualAPYService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/interestrate")
@CrossOrigin(origins = "*")
public class InterestRateController {
    @Autowired
    AnnualAPYService apyService;
    @Autowired
    AnnualAPRService aprService;
    @PostMapping("/apr")
    public ResponseEntity<?> createApr(@RequestBody AnnualInterestRequest annualInterestRequest, @RequestHeader("Authorization") String token){
        return aprService.create(annualInterestRequest,token);
    }
    @PostMapping("/apy")
    public ResponseEntity<?> createApy(@RequestBody AnnualInterestRequest annualInterestRequest,@RequestHeader("Authorization") String token){
        return apyService.create(annualInterestRequest,token);
    }
    @GetMapping("/aprlist")
    public ResponseEntity<?> getAPRList(@RequestHeader("Authorization") String token){
        return aprService.getAPRList(token);
    }
    @GetMapping("/apylist")
    public ResponseEntity<?> getAPYList(@RequestHeader("Authorization") String token){
        return apyService.getAPYList(token);
    }
}
