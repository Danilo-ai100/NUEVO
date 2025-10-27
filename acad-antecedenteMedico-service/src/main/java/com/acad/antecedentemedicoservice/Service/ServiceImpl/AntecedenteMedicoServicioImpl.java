package com.acad.antecedentemedicoservice.Service.ServiceImpl;

import com.acad.antecedentemedicoservice.Entity.AntecedenteMedico;
import com.acad.antecedentemedicoservice.Repository.AntecedenteMedicoRepositorio;
import com.acad.antecedentemedicoservice.Service.AntecedenteMedicoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AntecedenteMedicoServicioImpl implements AntecedenteMedicoServicio {

    @Autowired
    private AntecedenteMedicoRepositorio antecedenteMedicoRepositorio;

    @Override
    public List<AntecedenteMedico> listar() {
        return antecedenteMedicoRepositorio.findAll();
    }

    @Override
    public Optional<AntecedenteMedico> buscar(Long id) {
        return antecedenteMedicoRepositorio.findById(id);
    }

    @Override
    public AntecedenteMedico guardar(AntecedenteMedico antecedente) {
        return antecedenteMedicoRepositorio.save(antecedente);
    }

    @Override
    public AntecedenteMedico modificar(Long id, AntecedenteMedico antecedente) {
        if (!antecedenteMedicoRepositorio.existsById(id)) {
            throw new IllegalArgumentException("El antecedente médico con ID " + id + " no existe.");
        }
        antecedente.setIdAntecedenteMedico(id); // Aseguramos que el ID sea consistente
        return antecedenteMedicoRepositorio.save(antecedente);
    }

    @Override
    public void eliminar(Long id) {
        if (!antecedenteMedicoRepositorio.existsById(id)) {
            throw new IllegalArgumentException("El antecedente médico con ID " + id + " no existe.");
        }
        antecedenteMedicoRepositorio.deleteById(id);
    }
}
