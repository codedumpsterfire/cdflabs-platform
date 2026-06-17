package com.cdfxlabs.backend.services;

import com.cdfxlabs.backend.models.entity.Listing;
import org.springframework.stereotype.Service;
import com.cdfxlabs.backend.repositories.ListingRepository;

import java.util.List;

@Service
public class ListingService {
    private final ListingRepository listing;

    public ListingService(ListingRepository listing){
        this.listing = listing;
    }

    public List<Listing> getAllListings(){
        return listing.findAll();
    }
}
