/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author vietduc
 */
@Entity
@Table(catalog = "z11_elearning", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Permission.findAll", query = "SELECT p FROM Permission p")
    , @NamedQuery(name = "Permission.findByPmscode", query = "SELECT p FROM Permission p WHERE p.pmscode = :pmscode")
    , @NamedQuery(name = "Permission.findByPmsdesc", query = "SELECT p FROM Permission p WHERE p.pmsdesc = :pmsdesc")})
public class Permission implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(nullable = false, length = 50)
    private String pmscode;
    @Size(max = 254)
    @Column(length = 254)
    private String pmsdesc;

    public Permission() {
    }

    public Permission(String pmscode) {
        this.pmscode = pmscode;
    }

    public String getPmscode() {
        return pmscode;
    }

    public void setPmscode(String pmscode) {
        this.pmscode = pmscode;
    }

    public String getPmsdesc() {
        return pmsdesc;
    }

    public void setPmsdesc(String pmsdesc) {
        this.pmsdesc = pmsdesc;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (pmscode != null ? pmscode.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Permission)) {
            return false;
        }
        Permission other = (Permission) object;
        if ((this.pmscode == null && other.pmscode != null) || (this.pmscode != null && !this.pmscode.equals(other.pmscode))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Permission[ pmscode=" + pmscode + " ]";
    }
    
}
