package com.cdfxlabs.backend.controllers;

import com.cdfxlabs.backend.models.entity.Listing;
import com.cdfxlabs.backend.services.ListingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class ListingsController {

    private final ListingService listingsService;

    public ListingsController(ListingService listingService ){
        this.listingsService = listingService;
    }

    @GetMapping("/api/listings")
    public List<Listing> getListings(){
        return listingsService.getAllListings();
    }
}
